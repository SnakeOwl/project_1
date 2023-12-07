<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Admin\Storages\StorageRequest;
use App\Models\Storage;

class StoragesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Storage::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorageRequest $request)
    {
        Storage::create($request->validated());
        
	return response("", 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Storage $storage)
    {
        return $storage;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorageRequest $request, Storage $storage)
    {
        $storage->update($request->validated());

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Storage $storage)
    {
        $storage->delete();

        return response("", 204);
    }
}
