<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        Review::create([
            'name' => 'James Thornton',
            'location' => 'Crosby, Liverpool',
            'service' => 'Interior Painting & Decorating',
            'rating' => 5,
            'comment' => 'SK Home Solutions did a fantastic job repainting our hallway, stairs, and lounge. The cut-in lines are razor sharp and they protected our hardwood floors completely. Punctual, courteous, and very tidy every single day. Highly recommended in Liverpool!',
            'status' => 'Approved'
        ]);

        Review::create([
            'name' => 'Sarah Pendelton',
            'location' => 'Formby, Merseyside',
            'service' => 'Solid Oak Door Fitting & Joinery',
            'rating' => 5,
            'comment' => 'We had 6 internal solid oak doors hung along with new skirting boards. The carpentry precision was second to none. Every door latches smoothly and the mitered joints are seamless. Honest pricing with zero hidden costs.',
            'status' => 'Approved'
        ]);

        Review::create([
            'name' => 'Mark Davies',
            'location' => 'Aigburth, Liverpool',
            'service' => 'Bespoke Alcove Shelving & Cabinetry',
            'rating' => 5,
            'comment' => 'SK Home Solutions did a fantastic job. The finish joiner was precise and clean. Our built-in shelving fits perfectly in our alcove. Great job!',
            'status' => 'Approved'
        ]);
    }
}
