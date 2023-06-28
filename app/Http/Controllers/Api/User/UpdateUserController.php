<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\UpdateUserRequest;
use App\Models\User;

class UpdateUserController extends Controller
{
    public function __invoke(User $user, UpdateUserRequest $request)
    {
        $user = $request->user();

        $user->update($request->validated());

        // $user->updatePassword($params['password']);

        return response("", 204);
    }
}
