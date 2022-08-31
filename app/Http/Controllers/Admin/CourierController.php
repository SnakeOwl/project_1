<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\CreateCourierRequest;
use App\Http\Requests\UpdateCourierRequest;


class CourierController extends Controller
{
    // Курьеры - это пользователи с особыми правами
    public function index()
    {
        $couriers = User::couriers()->paginate(25);
        return view('admin.couriers.index', compact('couriers') );
    }

    public function create()
    {
        return view('admin.couriers.form');
    }

    public function store(CreateCourierRequest $request)
    {
        $params = $request->all();
        if(isset($params['password']))
        {
            $params['password'] = bcrypt($params['password']);
        }
        $params['rights'] = User::RIGHTS['courier'];
        User::create($params);

        session()->flash('info', 'Курьер добавлен');

        return redirect()->route('couriers.index');
    }


    public function show(User $courier)
    {
        return view('admin.couriers.show', compact('courier'));
    }


    public function edit(User $courier)
    {
        return view('admin.couriers.form', compact('courier'));
    }


    public function update(UpdateCourierRequest $request, User $courier)
    {
        $params = $request->all();
        if ($params['password'] != null)
        {
            $params['password'] = bcrypt($params['password']);
        }
        else
        {
            unset($params['password']);
        }
        $courier->update($params);
        session()->flash('info', 'Курьер изменен');

        return redirect()->route('couriers.index');
    }


    public function destroy(User $courier)
    {
        $courier->delete();
        session()->flash('info', 'Курьер удален.');

        return redirect()->route('couriers.index');
    }
}
