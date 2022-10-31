<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(25);

        return Inertia::render('Admin/User/Index', compact('users'));
    }

    public function show(User $user)
    {
        $active_orders = $user->orders()->active()->paginate(25);

        return Inertia::render('Admin/User/Show', compact('user', 'active_orders'));
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/User/Form', compact('user'));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $params = $request->safe()->all();

        if (! $user->updatePassword($params['password']))
        {
            unset($params['password']);
        }
        $user->update($params);

        session()->flash('message', 'Пользователь изменен');

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();

        session()->flash('message', 'Пользователь удален');

        return redirect()->route('users.index');
    }
}
