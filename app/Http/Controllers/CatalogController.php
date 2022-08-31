<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use App\Models\Sku;
use App\Http\Requests\ItemsFilterRequest;
use Inertia\Inertia;


class CatalogController extends Controller
{

    public function index(ItemsFilterRequest $request, $category_alias = null)
    {
        $skuQuery = Sku::with('item', 'item.category');
        $currentCategory = null;

        // работает либо фильтр, либо поисковик по имени
        if($request->filled('search'))
        {
            //либо работает поисковик
            $skuQuery->whereHas('item', function ($query) use ($request){
                $query->where('name', 'LIKE', '%'.$request->search.'%');
            });
        }
        else
        {
            if (isset($category_alias))
            {
                $skuQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $category_alias;
            }
            elseif ($request->has('category_alias'))
            {
                $skuQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $request->category_alias;
            }

            if ($request->filled('price_from'))
            {
                $skuQuery->where('price', '>=', $request->price_from);
            }

            if ($request->filled('price_to'))
            {
                $skuQuery->where('price', '<=', $request->price_to);
            }

            foreach(['hit', 'new'] as $field)
            {
                if($request->has($field))
                {
                    $skuQuery->whereHas('item', function ($query) use ($field){
                        $query->where($field, 1);
                    });
                }
            }
        }

        $skus = $skuQuery->paginate(12);

        // return Inertia::render()
        return view('catalog.index', [
            'currentCategory'=> $currentCategory,
            'skus' => $skus,
            'search' => ($request->filled('search'))? $request->search : null,
            'categories' => Category::all()
        ]);
    }


    public function show($category_alias, $item_alias, Sku $sku)
    {
        if ($sku->item->alias != $item_alias)
            abort(404);

        return view('catalog.show', compact('sku'));
    }
}
