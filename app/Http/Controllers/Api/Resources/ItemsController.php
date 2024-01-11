<?php

namespace App\Http\Controllers\Api\Resources;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Partner\CreateItemRequest;
use App\Http\Requests\Api\Partner\UpdateItemRequest;
use App\Http\Requests\Api\Partner\DeleteItemRequest;
use App\Models\Item;


class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $items = $user->items;

        if ($items === null)
            return response("", 204);
        
        return $items;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateItemRequest $request)
    {
        $params = $request->validated();
        $params["user_id"] = $request->user()->id;

        (new Item)->customCreate($params);

        return response("", 204);
    }


    public function show(Item $item)
    {
        return $item->load("parameters");
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $params= $request->validated();
        $item->update($params);
        $item->parameters()->delete();
        $item->createUniqueParameters($params["parameters"]);

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteItemRequest $request, Item $item)
    {
        $item->offers()->delete();
        $item->delete();

        $items = $request->user()->items;
        
        if ($items === null)
            return response("", 204);
            
        return $items;
    }
}
