<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $appends = ['is_overdue'];
    protected $casts = [
        'items' => 'array',
        'invoice_date' => 'date',
        'due_date' => 'date',
        'advance' => 'decimal:2',
        'total' => 'decimal:2',
        'due' => 'decimal:2',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function quote()
    {
        return $this->belongsTo(Quote::class);
    }

    public function getIsOverdueAttribute(): bool
    {
        if (!$this->due_date || $this->status === 'Paid') {
            return false;
        }
        return $this->due_date->startOfDay()->lt(now()->startOfDay());
    }
}
