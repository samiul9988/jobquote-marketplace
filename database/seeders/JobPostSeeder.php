<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\JobPost;

class JobPostSeeder extends Seeder
{
    public function run(): void
    {
        JobPost::create([
            'title' => 'Experienced Painter & Decorator',
            'type' => 'Full-Time / Subcontract',
            'location' => 'Liverpool & Merseyside',
            'rate' => 'Competitive (�150 - �200 / day based on exp)',
            'icon' => 'Paintbrush',
            'description' => 'We are seeking a skilled, quality-driven Painter & Decorator to deliver high-spec interior and exterior finishes across residential properties in Liverpool.',
            'requirements' => [
                'Minimum 3+ years UK painting & decorating experience',
                'Expert surface preparation, plaster repair, and dust-less sanding',
                'Crisp cutting-in lines on ceilings, walls, and woodwork',
                'Wallpapering and exterior masonry experience is a strong plus',
                'Own basic hand tools, clean whites, and driving license preferred'
            ],
            'status' => 'Active'
        ]);

        JobPost::create([
            'title' => 'Skilled Carpenter & Joiner',
            'type' => 'Full-Time / Subcontract',
            'location' => 'Liverpool & Merseyside',
            'rate' => 'Competitive (�160 - �220 / day based on exp)',
            'icon' => 'Hammer',
            'description' => 'We are looking for a reliable, precise finish joiner to execute internal timber and door hanging details to our high standards.',
            'requirements' => [
                'Proven UK carpentry & finish joinery experience',
                'Expertise in internal oak door hanging, latches, and hinges',
                'Precision installation of skirting boards, architraves, and mitered joints',
                'Experience building custom alcove shelving and timber frameworks',
                'Own 110V/cordless power tools and reliable transport'
            ],
            'status' => 'Active'
        ]);
    }
}
