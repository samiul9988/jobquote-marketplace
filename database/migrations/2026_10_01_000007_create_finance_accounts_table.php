<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('finance_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('cash'); // cash, bank, mobile
            $table->string('account_number')->nullable();
            $table->decimal('opening_balance', 10, 2)->default(0);
            $table->string('status')->default('Active'); // Active, Inactive
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('finance_accounts');
    }
};
