<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Faq;

class FaqController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['question' => 'required|string', 'answer' => 'required|string']);
        $order = Faq::max('order') + 1;
        Faq::create(['question' => $request->question, 'answer' => $request->answer, 'order' => $order, 'status' => 'Active']);
        return back()->with('success', 'FAQ added!');
    }

    public function update(Request $request, $id)
    {
        $request->validate(['question' => 'required|string', 'answer' => 'required|string']);
        Faq::findOrFail($id)->update(['question' => $request->question, 'answer' => $request->answer]);
        return back()->with('success', 'FAQ updated!');
    }

    public function destroy($id)
    {
        Faq::findOrFail($id)->delete();
        return back()->with('success', 'FAQ deleted!');
    }

    public function toggleStatus($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->status = $faq->status === 'Active' ? 'Inactive' : 'Active';
        $faq->save();
        return back()->with('success', 'FAQ status updated!');
    }
}
