<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('billing_address')->nullable()->after('address');
            $table->string('billing_postcode')->nullable()->after('billing_address');
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->string('billing_address')->nullable()->after('postcode');
            $table->string('billing_postcode')->nullable()->after('billing_address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn(['billing_address', 'billing_postcode']);
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn(['billing_address', 'billing_postcode']);
        });
    }
};
