<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('payment_instructions_mode')->default('Bank Details')->after('payment_term');
            $table->text('payment_instructions_other')->nullable()->after('payment_instructions_mode');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['payment_instructions_mode', 'payment_instructions_other']);
        });
    }
};
