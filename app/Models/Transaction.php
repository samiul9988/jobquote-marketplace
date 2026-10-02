<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function workProject()
    {
        return $this->belongsTo(WorkProject::class);
    }

    public function financeAccount()
    {
        return $this->belongsTo(FinanceAccount::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
