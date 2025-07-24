<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

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
