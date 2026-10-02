<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Service;
use App\Models\HeroImage;
use App\Models\Faq as FaqModel;
use App\Models\JobPost;
use App\Models\Review;
use App\Models\PaymentAccount;

class FrontendController extends Controller
{
    public function paymentInfo()
    {
        $paymentAccounts = PaymentAccount::where('status', 'Active')->orderBy('order')->orderBy('id')->get();
        return Inertia::render('PaymentInfoPage', ['paymentAccounts' => $paymentAccounts]);
    }

    public function serviceDetails($slug) {
        $service = Service::where('service_id', $slug)->firstOrFail();
        return Inertia::render('ServiceDetailsPage', ['service' => $service]);
    }

    public function home() { 
        $services = Service::where('status', 'Active')->get();
        $heroImages = HeroImage::where('status', 'Active')->orderBy('order')->get();
        $faqs = FaqModel::where('status', 'Active')->orderBy('order')->get();
        return Inertia::render('HomePage', ['services' => $services, 'heroImages' => $heroImages, 'faqs' => $faqs]); 
    }
    public function about() { return Inertia::render('AboutPage'); }
    public function services() { 
        $services = Service::where('status', 'Active')->get();
        return Inertia::render('ServicesPage', ['services' => $services]); 
    }
    public function gallery()
    {
        $projects = Project::where('status', 'Active')->orderBy('created_at', 'desc')->get();
        return Inertia::render('GalleryPage', [
            'projects' => $projects
        ]);
    }
    public function reviews() { 
        $reviews = Review::where('status', 'Approved')->orderBy('created_at', 'desc')->get();
        return Inertia::render('ReviewsPage', [
            'reviews' => $reviews
        ]); 
    }
    public function careers() { 
        $openings = JobPost::where('status', 'Active')->orderBy('created_at', 'desc')->get();
        return Inertia::render('CareersPage', [
            'openings' => $openings
        ]); 
    }
    public function contact() { return Inertia::render('ContactPage'); }
}
