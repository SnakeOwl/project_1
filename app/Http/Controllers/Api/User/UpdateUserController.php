<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;

class UpdateUserController extends Controller
{
    public function __invoke(User $user, UpdateUserRequest $request)
    {
        $user = $request->user();

        $params = $request->validated();
        $user->update([
            'phone' => $params['phone'],
            'name' => $params['name']
        ]);

        $user->updatePassword($params['password']);

        return [
            "message" => "success",
            "user" => $user
        ];
    }
}
