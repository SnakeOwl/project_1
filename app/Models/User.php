<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const RIGHTS = [
        'admin' => 10,
        "partner" => 6,
        'editor' => 5,
        'courier' => 3,
    ];

    protected $fillable = [
        'password',
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

    // partner's items
    public function items(): hasMany
    {
        return $this->hasMany(Item::class);
    }

    // partner's offers
    public function offers(): HasManyThrough
    {
        return $this->hasManyThrough(Offer::class, Item::class);
    }

    public function orders(): hasMany
    {
        return $this->hasMany(Order::class);
    }

    public function scopeByEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    public function scopeCouriers($query)
    {
        return $query->where('rights', User::RIGHTS['courier']);
    }

    public function isAdmin(): bool
    {
        return $this->rights === User::RIGHTS['admin'];
    }

    public function is_editor(): bool
    {
        return $this->isAdmin()
            || $this->rights === User::RIGHTS['editor'];
    }

    public function is_courier(): bool
    {
        return $this->isAdmin()
            || $this->is_editor()
            || $this->rights === User::RIGHTS['courier'];
    }
    public function isPartner(): bool
    {
        return $this->isAdmin()
            || $this->rights === User::RIGHTS["partner"];
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
