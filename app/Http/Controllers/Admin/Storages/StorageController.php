<?php
namespace App\Http\Controllers\Admin\Storages;

use App\Http\Requests\StorageRequest;
use App\Http\Controllers\Controller;
use App\Models\Storage;
use Inertia\Inertia;

class StorageController extends Controller
{
    public function index()
    {
        $storages = Storage::paginate(25);

        return Inertia::render('Admin/Storage/Index', compact('storages'));
    }

    public function create()
    {
        return Inertia::render('Admin/Storage/Form');
    }

    public function store(StorageRequest $request)
    {
        Storage::create($request->safe()->all());

        session()->flash('message', __('info.storage has added'));

        return redirect()->route('storages.index');
    }

    public function show(Storage $storage)
    {
        return Inertia::render('Admin/Storage/Show', compact('storage'));
    }

    public function edit(Storage $storage)
    {
        return Inertia::render('Admin/Storage/Form', compact('storage'));
    }

    public function update(StorageRequest $request, Storage $storage)
    {
        $storage->update($request->safe()->all());

        session()->flash('message', 'info.storage has changed');

        return redirect()->route('storages.index');
    }

    public function destroy(Storage $storage)
    {
        $storage->delete();

        session()->flash('message', 'info.storage has destroyed');
    }
}
