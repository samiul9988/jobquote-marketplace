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

class DashboardController extends Controller
{
    public function index()
    {
        $quotes = Quote::orderBy('created_at', 'desc')->get();
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        $jobPosts = JobPost::orderBy('created_at', 'desc')->get();
        $reviews = Review::orderBy('created_at', 'desc')->get();
        $projects = Project::orderBy('created_at', 'desc')->get();
        $heroImages = HeroImage::orderBy('order')->get(); // All images for CMS management
        $faqs = Faq::where('status', 'Active')->orderBy('order')->get();
        $services = Service::all();

        return Inertia::render('DashboardPage', [
            'quotes' => $quotes,
            'messages' => $messages,
            'jobPosts' => $jobPosts,
            'reviews' => $reviews,
            'projects' => $projects,
            'heroImages' => $heroImages,
            'faqs' => $faqs,
            'services' => $services
        ]);
    }
}
