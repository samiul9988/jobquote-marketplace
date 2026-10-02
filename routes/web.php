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
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PaymentSettingController;
use App\Http\Controllers\TrackingEventController;
use App\Http\Controllers\WorkProjectController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TimeEntryController;
use App\Http\Controllers\StaffAdvanceController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\FinanceAccountController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PaymentAccountController;

Route::post('/quotes', [QuoteController::class, 'store']);
Route::post('/find-tradesperson', [QuoteController::class, 'storeTrade']);
Route::get('/find-tradesperson', fn () => \Inertia\Inertia::render('FindTradespersonPage'));
Route::post('/contact', [ContactMessageController::class, 'store']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::post('/track-event', [TrackingEventController::class, 'store'])->middleware('throttle:60,1');
Route::post('/find-tradesperson/login', [AuthController::class, 'ajaxLogin']);
Route::post('/find-tradesperson/register', [AuthController::class, 'ajaxRegister']);

Route::controller(FrontendController::class)->group(function () {
    Route::get('/', 'home');
    Route::get('/about', 'about');
    Route::get('/services', 'services');
    Route::get('/services/{slug}', 'serviceDetails')->name('service.show');
    Route::get('/gallery', 'gallery');
    Route::get('/reviews', 'reviews');
    Route::get('/careers', 'careers');
    Route::get('/contact', 'contact');
    Route::get('/payment-info', 'paymentInfo');
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

Route::middleware(['auth', 'staff'])->group(function () {
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
    Route::post('/dashboard/settings/tracking', [SettingController::class, 'updateTracking']);
    Route::get('/dashboard/tracking/live', [TrackingEventController::class, 'live']);

    // Payment Account Setup
    Route::post('/dashboard/payment-settings', [PaymentSettingController::class, 'update']);

    // Payment Receiving Accounts (shown on public /payment-info page)
    Route::post('/dashboard/payment-accounts', [PaymentAccountController::class, 'store']);
    Route::post('/dashboard/payment-accounts/{id}', [PaymentAccountController::class, 'update']);
    Route::delete('/dashboard/payment-accounts/{id}', [PaymentAccountController::class, 'destroy']);
    Route::post('/dashboard/about', [SettingController::class, 'updateAbout']);
    Route::post('/dashboard/home', [SettingController::class, 'updateHome']);

    // Admin Profile
    Route::post('/dashboard/profile', [ProfileController::class, 'updateProfile']);
    Route::post('/dashboard/profile/password', [ProfileController::class, 'updatePassword']);

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

    // Customer Management
    Route::post('/dashboard/customers', [CustomerController::class, 'store']);
    Route::post('/dashboard/customers/import', [CustomerController::class, 'import']);
    Route::post('/dashboard/customers/{id}', [CustomerController::class, 'update']);
    Route::delete('/dashboard/customers/{id}', [CustomerController::class, 'destroy']);
    Route::post('/dashboard/customers/{id}/note', [CustomerController::class, 'addNote']);
    Route::post('/dashboard/customers/{id}/status', [CustomerController::class, 'updateStatus']);

    // Invoices
    Route::post('/dashboard/invoices', [InvoiceController::class, 'store']);
    Route::post('/dashboard/invoices/{id}', [InvoiceController::class, 'update']);
    Route::delete('/dashboard/invoices/{id}', [InvoiceController::class, 'destroy']);
    Route::post('/dashboard/invoices/{id}/status', [InvoiceController::class, 'updateStatus']);
    Route::post('/dashboard/quotes/{id}/generate-invoice', [InvoiceController::class, 'generateFromQuote']);

    // Projects (WorkProject)
    Route::post('/dashboard/work-projects', [WorkProjectController::class, 'store']);
    Route::post('/dashboard/work-projects/{id}', [WorkProjectController::class, 'update']);
    Route::delete('/dashboard/work-projects/{id}', [WorkProjectController::class, 'destroy']);
    Route::post('/dashboard/work-projects/{id}/status', [WorkProjectController::class, 'updateStatus']);

    // Income & Expenses (Transactions)
    Route::post('/dashboard/transactions', [TransactionController::class, 'store']);
    Route::delete('/dashboard/transactions/{id}', [TransactionController::class, 'destroy']);

    // Finance Accounts (Cash / Bank Management)
    Route::post('/dashboard/finance-accounts', [FinanceAccountController::class, 'store']);
    Route::post('/dashboard/finance-accounts/{id}', [FinanceAccountController::class, 'update']);
    Route::delete('/dashboard/finance-accounts/{id}', [FinanceAccountController::class, 'destroy']);

    // Suppliers (Supplier Payable)
    Route::post('/dashboard/suppliers', [SupplierController::class, 'store']);
    Route::post('/dashboard/suppliers/{id}', [SupplierController::class, 'update']);
    Route::delete('/dashboard/suppliers/{id}', [SupplierController::class, 'destroy']);

    // Time Clock (self-service) & Time Entries (admin corrections)
    Route::post('/dashboard/time-entries/clock-in', [TimeEntryController::class, 'clockIn']);
    Route::post('/dashboard/time-entries/clock-out', [TimeEntryController::class, 'clockOut']);
    Route::post('/dashboard/time-entries', [TimeEntryController::class, 'store']);
    Route::post('/dashboard/time-entries/{id}', [TimeEntryController::class, 'update']);
    Route::delete('/dashboard/time-entries/{id}', [TimeEntryController::class, 'destroy']);

    // Staff Advances
    Route::post('/dashboard/advances', [StaffAdvanceController::class, 'store']);
    Route::delete('/dashboard/advances/{id}', [StaffAdvanceController::class, 'destroy']);

    // Payroll
    Route::post('/dashboard/payroll/generate', [PayrollController::class, 'generate']);
    Route::post('/dashboard/payroll/{id}/pay', [PayrollController::class, 'markPaid']);
    Route::delete('/dashboard/payroll/{id}', [PayrollController::class, 'destroy']);

    // Account Management
    Route::post('/dashboard/accounts', [AccountController::class, 'store']);
    Route::post('/dashboard/accounts/{id}', [AccountController::class, 'update']);
    Route::delete('/dashboard/accounts/{id}', [AccountController::class, 'destroy']);
    Route::post('/dashboard/accounts/{id}/toggle', [AccountController::class, 'toggleStatus']);

});


Route::middleware(['auth', 'staff'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

