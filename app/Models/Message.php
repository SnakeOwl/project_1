<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'contacts';

    protected $fillable = [
        'name',
        'email',
        'message',
        'active'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }
}
