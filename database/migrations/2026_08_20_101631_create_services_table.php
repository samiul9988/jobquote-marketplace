<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_id')->unique(); // Because siteData uses 'id' string e.g. "painting-decorating"
            $table->string('title');
            $table->string('tagline')->nullable();
            $table->string('icon')->nullable();
            $table->string('category')->nullable();
            $table->string('badge')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->json('features')->nullable();
            $table->json('benefits')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('services');
    }
};
