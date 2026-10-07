<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Quote;
use App\Models\WorkProject;
use App\Models\Transaction;

class InvoiceController extends Controller
{
    public function store(Request $request)
    {
        $validated = $this->validateInvoice($request);

        $totals = $this->calculateTotals($validated['items'], $validated['advance'] ?? 0);

        Invoice::create([
            'invoice_number' => $this->nextInvoiceNumber(),
            'customer_id' => $validated['customer_id'],
            'quote_id' => $validated['quote_id'] ?? null,
            'items' => $validated['items'],
            'advance' => $validated['advance'] ?? 0,
            'total' => $totals['total'],
            'due' => $totals['due'],
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $validated['due_date'],
            'status' => $validated['status'] ?? 'Unpaid',
            'account_name' => $validated['account_name'] ?? 'SK Home Solutions',
            'account_number' => $validated['account_number'] ?? null,
            'sort_code' => $validated['sort_code'] ?? null,
            'payment_method' => $validated['payment_method'] ?? 'BACS or FPS Payment Only',
            'payment_term' => $validated['payment_term'] ?? '7 Days from Invoice Date',
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Invoice created successfully!');
    }

    public function update(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        $validated = $this->validateInvoice($request);

        $totals = $this->calculateTotals($validated['items'], $validated['advance'] ?? 0);

        $invoice->update([
            'customer_id' => $validated['customer_id'],
            'quote_id' => $validated['quote_id'] ?? $invoice->quote_id,
            'items' => $validated['items'],
            'advance' => $validated['advance'] ?? 0,
            'total' => $totals['total'],
            'due' => $totals['due'],
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $validated['due_date'],
            'status' => $validated['status'] ?? $invoice->status,
            'account_name' => $validated['account_name'] ?? $invoice->account_name,
            'account_number' => $validated['account_number'] ?? $invoice->account_number,
            'sort_code' => $validated['sort_code'] ?? $invoice->sort_code,
            'payment_method' => $validated['payment_method'] ?? $invoice->payment_method,
            'payment_term' => $validated['payment_term'] ?? $invoice->payment_term,
            'notes' => $validated['notes'] ?? $invoice->notes,
        ]);

        return back()->with('success', 'Invoice updated successfully!');
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return back()->with('success', 'Invoice deleted successfully!');
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Unpaid,Paid,Partially Paid',
        ]);

        $invoice = Invoice::findOrFail($id);
        $invoice->update(['status' => $validated['status']]);

        if ($validated['status'] === 'Paid') {
            $alreadyPosted = Transaction::where('source_type', 'invoice')
                ->where('source_id', $invoice->id)
                ->exists();

            if (!$alreadyPosted) {
                Transaction::create([
                    'type' => 'income',
                    'amount' => $invoice->total,
                    'category' => 'Invoice Payment',
                    'description' => "Invoice {$invoice->invoice_number}",
                    'work_project_id' => $invoice->work_project_id,
                    'source_type' => 'invoice',
                    'source_id' => $invoice->id,
                    'date' => now(),
                    'created_by' => null,
                ]);
            }
        }

        return back()->with('success', 'Invoice status updated!');
    }

    public function generateFromQuote(Request $request, $quoteId)
    {
        $quote = Quote::with('customer')->findOrFail($quoteId);

        if (!$quote->customer_id || !$quote->customer) {
            return back()->withErrors(['quote' => 'This quote has no linked customer, so an invoice cannot be generated.']);
        }

        $items = [
            [
                'description' => $quote->service ?? 'Work carried out',
                'amount' => 0,
            ],
        ];

        $totals = $this->calculateTotals($items, 0);

        $workProject = WorkProject::where('quote_id', $quote->id)->first();
        if (!$workProject) {
            $workProject = WorkProject::create([
                'title' => ($quote->service ?? 'Project') . ' - ' . $quote->customer->name,
                'customer_id' => $quote->customer_id,
                'quote_id' => $quote->id,
                'status' => 'Active',
                'started_at' => now(),
            ]);
        }

        $invoice = Invoice::create([
            'invoice_number' => $this->nextInvoiceNumber(),
            'customer_id' => $quote->customer_id,
            'quote_id' => $quote->id,
            'work_project_id' => $workProject->id,
            'items' => $items,
            'advance' => 0,
            'total' => $totals['total'],
            'due' => $totals['due'],
            'invoice_date' => now()->toDateString(),
            'due_date' => now()->addDays(7)->toDateString(),
            'status' => 'Unpaid',
            'account_name' => 'SK Home Solutions',
            'account_number' => null,
            'sort_code' => null,
            'payment_method' => 'BACS or FPS Payment Only',
            'payment_term' => '7 Days from Invoice Date',
        ]);

        $quote->update(['status' => 'Accepted']);

        return back()->with('success', 'Invoice generated from quote!')->with('generated_invoice_id', $invoice->id);
    }

    /**
     * Generate an invoice from a project's current itemised price list.
     * Used when the admin is ready to bill the customer for work agreed (or
     * re-agreed) so far — the invoice line items are a direct snapshot of
     * the project's price_items at this moment.
     */
    public function generateFromProject(Request $request, $projectId)
    {
        $workProject = WorkProject::with('customer')->findOrFail($projectId);

        if (!$workProject->customer_id || !$workProject->customer) {
            return back()->withErrors(['project' => 'This project has no linked customer, so an invoice cannot be generated.']);
        }

        $items = $workProject->price_items ?: [[
            'description' => $workProject->title,
            'amount' => (float) $workProject->agreed_price,
        ]];

        $totals = $this->calculateTotals($items, 0);

        $invoice = Invoice::create([
            'invoice_number' => $this->nextInvoiceNumber(),
            'customer_id' => $workProject->customer_id,
            'quote_id' => $workProject->quote_id,
            'work_project_id' => $workProject->id,
            'items' => $items,
            'advance' => 0,
            'total' => $totals['total'],
            'due' => $totals['due'],
            'invoice_date' => now()->toDateString(),
            'due_date' => now()->addDays(7)->toDateString(),
            'status' => 'Unpaid',
            'account_name' => 'SK Home Solutions',
            'account_number' => null,
            'sort_code' => null,
            'payment_method' => 'BACS or FPS Payment Only',
            'payment_term' => '7 Days from Invoice Date',
        ]);

        return back()->with('success', 'Invoice generated from project!')->with('generated_invoice_id', $invoice->id);
    }

    private function validateInvoice(Request $request): array
    {
        return $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'quote_id' => 'nullable|exists:quotes,id',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.amount' => 'required|numeric',
            'advance' => 'nullable|numeric',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date',
            'status' => 'nullable|in:Unpaid,Paid,Partially Paid',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:255',
            'sort_code' => 'nullable|string|max:255',
            'payment_method' => 'nullable|string|max:255',
            'payment_term' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);
    }

    private function calculateTotals(array $items, $advance): array
    {
        $total = collect($items)->sum(fn ($item) => (float) ($item['amount'] ?? 0));
        $due = $total - (float) $advance;

        return ['total' => $total, 'due' => $due];
    }

    private function nextInvoiceNumber(): string
    {
        $max = 0;
        foreach (Invoice::where('invoice_number', 'like', 'SK%')->pluck('invoice_number') as $number) {
            $numeric = (int) preg_replace('/\D/', '', $number);
            if ($numeric > $max) {
                $max = $numeric;
            }
        }

        return 'SK' . str_pad($max + 1, 4, '0', STR_PAD_LEFT);
    }
}
