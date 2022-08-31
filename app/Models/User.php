<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const RIGHTS = [
        'admin' => 10,
        'editor' => 5,
        'courier' => 3
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    public function scopeCouriers($query)
    {
        return $query->where('rights', User::RIGHTS['courier']);
    }

    public function is_admin()
    {
        return $this->rights === User::RIGHTS['admin'];
    }

    public function is_editor()
    {
        return $this->is_admin() || $this->rights === User::RIGHTS['editor'];
    }

    public function is_courier()
    {
        return $this->is_admin() || $this->is_editor() || $this->rights === User::RIGHTS['courier'];
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'rights',
        'order_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
