<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'notes' => 'array',
        'credit_limit' => 'decimal:2',
    ];
    protected $appends = ['total_purchased', 'total_paid', 'total_due', 'available_credit'];

    protected static function booted()
    {
        static::creating(function (Customer $customer) {
            if (empty($customer->customer_code)) {
                $customer->customer_code = static::generateCustomerCode();
            }
        });
    }

    public static function generateCustomerCode(): string
    {
        $lastId = (static::max('id') ?? 0) + 1;
        $code = 'CUS-' . str_pad((string) $lastId, 5, '0', STR_PAD_LEFT);

        while (static::where('customer_code', $code)->exists()) {
            $lastId++;
            $code = 'CUS-' . str_pad((string) $lastId, 5, '0', STR_PAD_LEFT);
        }

        return $code;
    }

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function getTotalPurchasedAttribute()
    {
        return (float) $this->invoices()->sum('total');
    }

    public function getTotalPaidAttribute()
    {
        return (float) ($this->invoices()->sum('total') - $this->invoices()->sum('due'));
    }

    public function getTotalDueAttribute()
    {
        return (float) $this->invoices()->sum('due');
    }

    public function getAvailableCreditAttribute()
    {
        return (float) $this->credit_limit - $this->total_due;
    }
}
