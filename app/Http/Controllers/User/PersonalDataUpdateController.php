<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PersonalUpdateUserRequest;
use Illuminate\Support\Facades\Auth;


class PersonalDataUpdateController extends Controller
{
    public function __invoke(PersonalUpdateUserRequest $request)
    {
        $user = Auth::user();
        $user->update($request->validated());

        session()->flash('message', __('info.personal data changed'));
    }
}
