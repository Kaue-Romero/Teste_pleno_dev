<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'status' => 'string',
    ];

    public function getStatusLabelAttribute()
    {
        return $this->status ? $this->status->label() : '';
    }
}
