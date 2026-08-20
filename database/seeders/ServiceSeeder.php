<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'service_id' => 'painting-decorating',
                'title' => 'Painting & Decorating',
                'tagline' => 'Interior & Exterior Wall Finishing',
                'icon' => 'Paintbrush',
                'category' => 'painting',
                'badge' => 'Core Trade 01',
                'description' => 'Complete professional painting and decorating solutions designed to refresh, protect, and enhance your home or commercial space across Liverpool.',
                'image' => '/images/gallery/sk-home-solutions-interior-wall-painting-service.jpg',
                'features' => json_decode('["Interior Wall & Ceiling Painting","Exterior Masonry & Weatherproof Painting","Surface Preparation & Plaster Repair","Wallpapering & Accent Feature Walls","Woodwork & Trim Enameling","Property Refresh & Renovation"]', true),
                'benefits' => json_decode('["Flawless surface preparation, sanding, and hole filling","Crisp, laser-sharp cutting-in lines on ceilings and woodwork","Trade-grade paints with high durability and low odour","Full dust protection on furniture, floors, and fixtures","Clean, orderly tidy-up at the end of each working day"]', true),
                'status' => 'Active',
            ],
            [
                'service_id' => 'carpentry-joinery',
                'title' => 'Carpentry & Joinery',
                'tagline' => 'Custom Woodwork & Precision Installations',
                'icon' => 'Hammer',
                'category' => 'carpentry',
                'badge' => 'Core Trade 02',
                'description' => 'Expert carpentry and joinery services tailored to your exact specifications, from bespoke woodwork to repairs and internal installations.',
                'image' => '/images/gallery/sk-home-solutions-handcrafted-table-leg-joinery-detail.jpeg',
                'features' => json_decode('["General Carpentry & Repairs","Internal & External Door Hanging","Skirting Boards, Architraves & Coving","Custom Shelving & Built-in Units","Flooring Installation & Adjustments","Timber Framework & Bespoke Solutions"]', true),
                'benefits' => json_decode('["Accurate door hanging with smooth latching and fitting","Custom alcove joinery maximize storage and living aesthetics","Seamless mitered corners on skirting boards and architraves","Durable solid hardwood and engineered timber materials","Quality woodwork repairs and structural timber installations"]', true),
                'status' => 'Active',
            ],
            [
                'service_id' => 'plastering-prep',
                'title' => 'Plastering & Surface Preparation',
                'tagline' => 'Smooth Skimming & Wall Repairs',
                'icon' => 'Layers',
                'category' => 'plastering',
                'badge' => 'Specialist Trade',
                'description' => 'High-grade wall skimming, plasterboard installation, and surface preparation to create glass-smooth walls ready for painting.',
                'image' => '/images/gallery/sk-home-solutions-room-transformation-with-fresh-paint.jpeg',
                'features' => json_decode('["Full Room Wall & Ceiling Skimming","Plasterboard & Drylining Installation","Crack, Hole & Water Damage Repairs","Surface Sanding & Priming","Smooth Ready-to-Paint Finish"]', true),
                'benefits' => json_decode('["Glass-smooth wall surfaces with zero bumps or ridges","Eliminates old cracks, peeling paint, and surface flaws","Perfect adhesion base for modern interior emulsions"]', true),
                'status' => 'Active',
            ],
            [
                'service_id' => 'bespoke-shelving',
                'title' => 'Bespoke Built-In Storage & Shelving',
                'tagline' => 'Custom Living Room Alcove Units',
                'icon' => 'Sparkles',
                'category' => 'carpentry',
                'badge' => 'Joinery Craft',
                'description' => 'Made-to-measure alcove bookcases, floating shelving, TV media walls, and under-stair storage cupboards tailored to your home layout.',
                'image' => '/images/gallery/sk-home-solutions-modern-wood-shelf-with-coloured-dividers.jpeg',
                'features' => json_decode('["Made-to-Measure Alcove Units","Integrated Lower Cupboards & Soft-Close Doors","Floating Solid Oak Shelving","Under-Stair Storage Solutions","Cable Management & Primed Finish"]', true),
                'benefits' => json_decode('["Maximizes unused living room alcove and hallway space","Handcrafted to exact dimensions with seamless wall fitting","Choice of solid oak or spray-painted finishes"]', true),
                'status' => 'Active',
            ],
            [
                'service_id' => 'door-skirting-fitting',
                'title' => 'Door Hanging & Skirting Installation',
                'tagline' => 'Internal Oak Doors & Mitered Mouldings',
                'icon' => 'Ruler',
                'category' => 'carpentry',
                'badge' => 'Carpentry Finish',
                'description' => 'Precision installation of solid oak, pine, and fire doors with architectural ironmongery, plus seamless skirting boards and architraves.',
                'image' => '/images/gallery/sk-home-solutions-fine-wood-joinery-corner-detail.jpeg',
                'features' => json_decode('["Solid Oak & Glazed Internal Door Hanging","Period & Contemporary Skirting Boards","Precision Mitered Architraves & Frames","Latches, Handles & Hinge Recessing","Door Trimming Over New Flooring"]', true),
                'benefits' => json_decode('["Smooth swing and exact latch alignment with zero stick","Clean, tight miter corners with seamless wall caulking","Enhances the architectural value of any property"]', true),
                'status' => 'Active',
            ],
            [
                'service_id' => 'property-refresh',
                'title' => 'Full Property Refresh & Turnovers',
                'tagline' => 'Complete Home & Rental Makeovers',
                'icon' => 'Wrench',
                'category' => 'refresh',
                'badge' => 'Turnkey Solution',
                'description' => 'Comprehensive multi-trade property refreshments for homeowners, landlords, and estate agents before tenancy, sale, or move-in.',
                'image' => '/images/gallery/sk-home-solutions-luxury-living-room-interior-design-inspiration.webp',
                'features' => json_decode('["Full Interior Wall & Woodwork Painting","Carpentry Repairs & Door Adjustments","Mastic, Caulking & Sealant Replacement","Fast Turnaround for Rental Schedules","Complete Clean & Tidy Handover"]', true),
                'benefits' => json_decode('["One reliable trade team handling all refresh needs","Punctual delivery to meet move-in or tenancy deadlines","Clean, respectful execution with honest fixed quotes"]', true),
                'status' => 'Active',
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
