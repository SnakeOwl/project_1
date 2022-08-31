<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StorageRequest;
use App\Http\Controllers\Controller;
use App\Models\Storage;
use Illuminate\Http\Request;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $storages = Storage::paginate(25);
        return view ('admin.storages.index', compact('storages') );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view ('admin.storages.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorageRequest $request)
    {
        Storage::create($request->safe()->all());
        session()->flash('info', __('info.object added'));

        return redirect()->route('storages.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Storage  $storage
     * @return \Illuminate\Http\Response
     */
    public function edit(Storage $storage)
    {
        return view('admin.storages.form', compact('storage'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Storage  $storage
     * @return \Illuminate\Http\Response
     */
    public function update(StorageRequest $request, Storage $storage)
    {
        $storage->update($request->safe()->all());
        session()->flash('info', 'Склад (магазин) изменен.');

        return redirect()->route('storages.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Storage  $storage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Storage $storage)
    {
        $storage->delete();
        session()->flash('info', 'Склад (магазин) удален.');

        return redirect()->route('storages.index');
    }
}
