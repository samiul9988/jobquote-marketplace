<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaryPayment extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'generated_at' => 'datetime',
        'paid_at' => 'datetime',
        'advance_ids' => 'array',
        'hours_worked' => 'decimal:2',
        'hourly_rate' => 'decimal:2',
        'gross_amount' => 'decimal:2',
        'advances_deducted' => 'decimal:2',
        'net_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
