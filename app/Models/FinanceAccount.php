<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceAccount extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = ['opening_balance' => 'decimal:2'];
    protected $appends = ['current_balance'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getCurrentBalanceAttribute()
    {
        $income = $this->transactions()->where('type', 'income')->sum('amount');
        $expense = $this->transactions()->where('type', 'expense')->sum('amount');

        return (float) $this->opening_balance + (float) $income - (float) $expense;
    }
}
