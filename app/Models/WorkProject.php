<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkProject extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'started_at' => 'date',
        'completed_at' => 'date',
    ];
    protected $appends = ['total_income', 'total_expense', 'net_profit'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getTotalIncomeAttribute()
    {
        return (float) ($this->relationLoaded('transactions')
            ? $this->transactions->where('type', 'income')->sum('amount')
            : $this->transactions()->where('type', 'income')->sum('amount'));
    }

    public function getTotalExpenseAttribute()
    {
        return (float) ($this->relationLoaded('transactions')
            ? $this->transactions->where('type', 'expense')->sum('amount')
            : $this->transactions()->where('type', 'expense')->sum('amount'));
    }

    public function getNetProfitAttribute()
    {
        return $this->total_income - $this->total_expense;
    }
}
