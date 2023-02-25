<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\belongsToMany;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const RIGHTS = [
        'admin' => 10,
        'editor' => 5,
        'courier' => 3
    ];

    protected $fillable = [
        'name',
        'email',
        'phone',
        'rights',
        'order_id',
    ];

    // $password - is not hashed string
    public function updatePassword($password): bool
    {
        if (is_null($password))
            return false;

        $this->update(['password' => bcrypt($password)]);
        return true;
    }

    public function orders(): belongsToMany
    {
        return $this->belongsToMany(Order::class);
    }

    public function scopeCouriers($query)
    {
        return $query->where('rights', User::RIGHTS['courier']);
    }

    public function is_admin(): bool
    {
        return $this->rights === User::RIGHTS['admin'];
    }

    public function is_editor(): bool
    {
        return $this->is_admin()
            || $this->rights === User::RIGHTS['editor'];
    }

    public function is_courier(): bool
    {
        return $this->is_admin()
            || $this->is_editor()
            || $this->rights === User::RIGHTS['courier'];
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
