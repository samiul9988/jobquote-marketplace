<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->text('answer');
            $table->integer('order')->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('faqs');
    }
};
