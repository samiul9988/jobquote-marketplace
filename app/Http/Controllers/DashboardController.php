<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\HeroImage;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Quote;
use App\Models\ContactMessage;
use App\Models\JobPost;
use App\Models\Review;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use App\Models\WorkProject;
use App\Models\Transaction;
use App\Models\TimeEntry;
use App\Models\StaffAdvance;
use App\Models\SalaryPayment;
use App\Models\CustomerLog;
use App\Models\FinanceAccount;
use App\Models\Supplier;
use App\Models\PaymentAccount;

class DashboardController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $isAdmin = $currentUser->role === 'admin';
        $quotes = Quote::orderBy('created_at', 'desc')->get();
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        $jobPosts = JobPost::orderBy('created_at', 'desc')->get();
        $reviews = Review::orderBy('created_at', 'desc')->get();
        $projects = Project::orderBy('created_at', 'desc')->get();
        $heroImages = HeroImage::orderBy('order')->get(); // All images for CMS management
        $faqs = Faq::where('status', 'Active')->orderBy('order')->get();
        $services = Service::all();
        $customers = Customer::with(['quotes', 'invoices'])->orderBy('created_at', 'desc')->get();
        $invoices = Invoice::with(['customer', 'quote'])->orderBy('created_at', 'desc')->get();
        $accounts = User::whereIn('role', ['admin', 'staff'])->orderBy('created_at')->get();
        $workProjects = WorkProject::with(['customer', 'invoices', 'transactions'])->orderBy('created_at', 'desc')->get();
        $transactions = Transaction::with(['workProject', 'financeAccount', 'supplier'])->orderBy('date', 'desc')->orderBy('created_at', 'desc')->get();
        $financeAccounts = FinanceAccount::orderBy('name')->get();
        $suppliers = Supplier::orderBy('name')->get();
        $paymentAccounts = PaymentAccount::orderBy('order')->orderBy('id')->get();

        if ($isAdmin) {
            $timeEntries = TimeEntry::with(['user', 'workProject'])->orderBy('clock_in', 'desc')->get();
            $staffAdvances = StaffAdvance::with('user')->orderBy('date', 'desc')->get();
            $salaryPayments = SalaryPayment::with('user')->orderBy('period_start', 'desc')->get();
        } else {
            $timeEntries = TimeEntry::with('workProject')->where('user_id', $currentUser->id)->orderBy('clock_in', 'desc')->get();
            $staffAdvances = StaffAdvance::where('user_id', $currentUser->id)->orderBy('date', 'desc')->get();
            $salaryPayments = SalaryPayment::where('user_id', $currentUser->id)->orderBy('period_start', 'desc')->get();
        }

        $staffList = User::whereIn('role', ['admin', 'staff'])->where('is_active', true)->get(['id', 'name', 'hourly_rate']);
        $customerLogs = CustomerLog::with(['customer', 'user'])->orderBy('created_at', 'desc')->limit(200)->get();

        return Inertia::render('DashboardPage', [
            'quotes' => $quotes,
            'messages' => $messages,
            'jobPosts' => $jobPosts,
            'reviews' => $reviews,
            'projects' => $projects,
            'heroImages' => $heroImages,
            'faqs' => $faqs,
            'services' => $services,
            'customers' => $customers,
            'invoices' => $invoices,
            'accounts' => $accounts,
            'workProjects' => $workProjects,
            'transactions' => $transactions,
            'financeAccounts' => $financeAccounts,
            'suppliers' => $suppliers,
            'paymentAccounts' => $paymentAccounts,
            'timeEntries' => $timeEntries,
            'staffAdvances' => $staffAdvances,
            'salaryPayments' => $salaryPayments,
            'staffList' => $staffList,
            'customerLogs' => $customerLogs,
        ]);
    }
}
