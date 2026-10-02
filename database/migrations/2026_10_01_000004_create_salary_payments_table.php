<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salary_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('period_start');
            $table->date('period_end');
            $table->decimal('hours_worked', 8, 2);
            $table->decimal('hourly_rate', 8, 2);
            $table->decimal('gross_amount', 10, 2);
            $table->decimal('advances_deducted', 10, 2)->default(0);
            $table->json('advance_ids')->nullable();
            $table->decimal('net_amount', 10, 2);
            $table->string('status')->default('Pending');
            $table->dateTime('generated_at');
            $table->dateTime('paid_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salary_payments');
    }
};
