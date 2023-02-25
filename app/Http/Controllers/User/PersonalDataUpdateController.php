<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PersonalUpdateUserRequest;
use Illuminate\Support\Facades\Auth;


class PersonalDataUpdateController extends Controller
{
    public function __invoke(PersonalUpdateUserRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();

        if (isset($validated['phone']) && $user->phone != $validated['phone'])
            $user->update(['phone' => $validated['phone']]);

        session()->flash('info', __('dataHasBeenChanged'));

        return redirect()->route("personal-page");
    }
}
