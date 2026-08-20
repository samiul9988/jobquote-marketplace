<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->string('location');
            $table->string('rate');
            $table->string('icon')->default('Paintbrush');
            $table->text('description');
            $table->json('requirements')->nullable();
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('job_posts');
    }
};
