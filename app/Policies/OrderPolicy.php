<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;


    /**
    * Determine if the given post can be updated by the user.
    *
    * @param  \App\Models\User  $user
    * @param  \App\Models\Post  $post
    * @return bool
    */
    public function update(User $user, Post $post)
    {
        return true;// $user->orders()->findOrFail($order->id);
    }
}
