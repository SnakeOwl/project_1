<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use App\Models\Parameter;
use App\Models\Galery;
use App\Models\Property;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;


class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('skus')->paginate(25);
        return view('admin.items.index', compact('items'));
    }

    public function create()
    {
        $properties = Property::all();
        $categories = Category::all();

        return view('admin.items.form', compact('properties', 'categories'));
    }

    public function store(CreateItemRequest $request)
    {
        $params = $request->all();

        // save short image for card in category
        if ($request->hasFile('short_image') && $request->file('short_image')->isValid())
        {
            $params['short_image'] = $request->File('short_image')->store('images');
        }

        // save galery images to show in datail page
        if ($request->hasFile('galery-images') )
        {
            $galery = null;
            $images = $request->File('galery-images');
            foreach ($images as $file)
            {
                if ($file->isValid())
                {
                    $f_path = $file->store('images');
                    $galery[] = $f_path;
                    $f_path = null;
                }
            }
            $params['galery'] = $galery;
            unset($params['galery-images']);
        }

        (new Item())->createItem($params);
        session()->flash('info', 'Товар добавлен');

        return redirect()->route('items.index');
    }

    public function show(Item $item)
    {
        $categories = Category::all();
        $properties = Property::get();
        return view('admin.items.show', compact('properties', 'categories', 'item'));
    }

    public function edit(Item $item)
    {
        $categories = Category::all();
        $properties = Property::get();
        return view('admin.items.form', compact('properties', 'categories', 'item'));
    }

    public function update(UpdateItemRequest $request, Item $item)
    {
        $params = $request->all();

        if ($request->hasFile('short_image'))
        {
            Storage::delete($item->short_image); // delete old image
            $params['short_image'] = $request->File('short_image')->store('images'); // save new one
        }

        // save galery images to show in datail page
        if ($request->hasFile('galery-images') )
        {
            $galery = null;
            $images = $request->File('galery-images');
            foreach ($images as $file)
            {
                if ($file->isValid())
                {
                    $f_path = $file->store('images');
                    $galery[] = $f_path;
                    $f_path = null;
                }
            }
            $params['galery'] = $galery;
            unset($params['galery-images']);
        }

        $item->updateItem($params);
        session()->flash('info', 'Товар изменен');

        return redirect()->route('items.index');
    }

    public function destroy(Item $item)
    {
        $item->skus()->delete();
        $item->delete();
        session()->flash('info', 'Товар и его товарные предложения были удалены');

        return redirect()->route('items.index');
    }
}
