<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeEntry extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'clock_in' => 'datetime',
        'clock_out' => 'datetime',
    ];
    protected $appends = ['hours'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workProject()
    {
        return $this->belongsTo(WorkProject::class);
    }

    public function getHoursAttribute()
    {
        if (!$this->clock_out) {
            return null;
        }

        return round($this->clock_in->diffInMinutes($this->clock_out) / 60, 2);
    }
}
