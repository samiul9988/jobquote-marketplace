<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'phone', 'value' => '+44 7912 345 678'],
            ['key' => 'whatsapp', 'value' => '+44 7912 345 678'],
            ['key' => 'email', 'value' => 'info@skhomesolutions.uk'],
            ['key' => 'location', 'value' => 'Liverpool & Merseyside'],
            ['key' => 'logo', 'value' => ''],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], ['value' => $setting['value']]);
        }
    }
}
