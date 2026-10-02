<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('label'); // e.g. "Barclays Business Account", "bKash Personal"
            $table->string('type')->default('bank'); // bank, bkash, nagad, paypal, other
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('sort_code')->nullable();
            $table->string('iban')->nullable();
            $table->string('swift_code')->nullable();
            $table->text('instructions')->nullable();
            $table->integer('order')->default(0);
            $table->string('status')->default('Active'); // Active, Inactive
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_accounts');
    }
};
