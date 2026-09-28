<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->foreignId('quote_id')->nullable()->constrained('quotes')->nullOnDelete();
            $table->json('items');
            $table->decimal('advance', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);
            $table->decimal('due', 10, 2)->default(0);
            $table->date('invoice_date');
            $table->date('due_date');
            $table->string('status')->default('Unpaid'); // Unpaid, Paid, Partially Paid
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('sort_code')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_term')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
