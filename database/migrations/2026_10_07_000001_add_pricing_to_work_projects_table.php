<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('work_projects', function (Blueprint $table) {
            $table->json('price_items')->nullable()->after('notes');
            $table->decimal('agreed_price', 10, 2)->default(0)->after('price_items');
            $table->json('price_history')->nullable()->after('agreed_price');
        });
    }

    public function down(): void
    {
        Schema::table('work_projects', function (Blueprint $table) {
            $table->dropColumn(['price_items', 'agreed_price', 'price_history']);
        });
    }
};
