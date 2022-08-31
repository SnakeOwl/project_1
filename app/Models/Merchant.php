<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Merchant extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
    ];

    public function updateToken()
    {
        $token = \Str::random(60);
        $this->api_token = hash('sha256', $token);
        $this->save();

        return $token;
    }
}
