<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->foreignId('finance_account_id')->nullable()->after('work_project_id')->constrained('finance_accounts')->nullOnDelete();
            $table->foreignId('supplier_id')->nullable()->after('finance_account_id')->constrained('suppliers')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('finance_account_id');
            $table->dropConstrainedForeignId('supplier_id');
        });
    }
};
