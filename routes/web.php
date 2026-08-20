<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\JobPostController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\HeroImageController;
use App\Http\Controllers\FaqController;

Route::post('/quotes', [QuoteController::class, 'store']);
Route::post('/contact', [ContactMessageController::class, 'store']);
Route::post('/reviews', [ReviewController::class, 'store']);

Route::controller(FrontendController::class)->group(function () {
    Route::get('/', 'home');
    Route::get('/about', 'about');
    Route::get('/services', 'services');
    Route::get('/services/{slug}', 'serviceDetails')->name('service.show');
    Route::get('/gallery', 'gallery');
    Route::get('/reviews', 'reviews');
    Route::get('/careers', 'careers');
    Route::get('/contact', 'contact');
});

Route::middleware('guest')->group(function () {
    Route::controller(AuthController::class)->group(function () {

    Route::get('/login', 'index')->name('login');
    Route::get('/signup', 'index');
    Route::get('/auth', 'index');
    Route::post('/login', 'login');
    Route::post('/signup', 'register');
    });
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/quotes/{id}/read', [QuoteController::class, 'markAsRead']);
    Route::post('/contact/{id}/read', [ContactMessageController::class, 'markAsRead']);
    
    // Careers CMS CRUD
    Route::post('/dashboard/jobs', [JobPostController::class, 'store']);
    Route::post('/dashboard/jobs/{id}', [JobPostController::class, 'update']);
    Route::delete('/dashboard/jobs/{id}', [JobPostController::class, 'destroy']);
    Route::post('/dashboard/jobs/{id}/toggle', [JobPostController::class, 'toggleStatus']);

    // Reviews CMS CRUD
    Route::post('/dashboard/reviews/{id}/approve', [ReviewController::class, 'approve']);
    Route::post('/dashboard/reviews/{id}/reject', [ReviewController::class, 'reject']);
    Route::delete('/dashboard/reviews/{id}', [ReviewController::class, 'destroy']);

    // Global Settings
    Route::post('/dashboard/settings', [SettingController::class, 'update']);
    Route::post('/dashboard/about', [SettingController::class, 'updateAbout']);
    Route::post('/dashboard/home', [SettingController::class, 'updateHome']);

    // Gallery CMS
    

    // Hero Slider
    Route::post('/dashboard/hero-images', [HeroImageController::class, 'store']);
    Route::delete('/dashboard/hero-images/{id}', [HeroImageController::class, 'destroy']);
    Route::put('/dashboard/hero-images/{id}/toggle', [HeroImageController::class, 'toggleStatus']);

    // FAQs CMS
    Route::post('/dashboard/faqs', [FaqController::class, 'store']);
    Route::post('/dashboard/faqs/{id}', [FaqController::class, 'update']);
    Route::delete('/dashboard/faqs/{id}', [FaqController::class, 'destroy']);
    Route::put('/dashboard/faqs/{id}/toggle', [FaqController::class, 'toggleStatus']);

    // Services CMS
    Route::post('/dashboard/services', [ServiceController::class, 'store']);
    Route::post('/dashboard/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/dashboard/services/{id}', [ServiceController::class, 'destroy']);
    Route::put('/dashboard/services/{id}/toggle', [ServiceController::class, 'toggleStatus']);

    Route::post('/dashboard/gallery', [ProjectController::class, 'store']);
    Route::post('/dashboard/gallery/{id}', [ProjectController::class, 'update']);
    Route::delete('/dashboard/gallery/{id}', [ProjectController::class, 'destroy']);
    Route::put('/dashboard/gallery/{id}/toggle', [ProjectController::class, 'toggleStatus']);

});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

