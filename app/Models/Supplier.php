<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = ['opening_balance' => 'decimal:2'];
    protected $appends = ['total_paid', 'payable_balance'];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getTotalPaidAttribute()
    {
        return (float) $this->transactions()->where('type', 'expense')->sum('amount');
    }

    public function getPayableBalanceAttribute()
    {
        return (float) $this->opening_balance - $this->total_paid;
    }
}
