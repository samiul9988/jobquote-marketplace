<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = ['notes' => 'array'];

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }
}
