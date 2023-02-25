<?php
namespace App\Http\Controllers\Admin\Offers;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Offers\OfferRequest;
use Inertia\Inertia;

class OfferController extends Controller
{
    public function index(Item $item)
    {
        $offers = $item->offers()->paginate(25);

        return Inertia::render('Admin/Item/Offer/Index', compact('offers', 'item'));
    }


    public function create(Item $item)
    {
        $category = $item->category->load("shapes.shapeOptions");

        return Inertia::render('Admin/Item/Offer/Form',
            compact(['item', 'category']));
    }


    public function store(OfferRequest $request, Item $item)
    {
        (new Offer)->customCreate($request->validated());

        session()->flash('message', __('offer has created'));

        return redirect()->route('items.offers.index', $item);
    }


    public function show(Item $item, Offer $offer)
    {
        return Inertia::render('Admin/Item/Offer/Show', compact('item', 'offer'));
    }


    public function edit(Item $item, Offer $offer)
    {
        $offer->shapeOptions;
        $offer->images;
        $category = $item->category->load("shapes.shapeOptions");

        return Inertia::render('Admin/Item/Offer/Form', compact('item', 'offer'));
    }


    public function update(OfferRequest $request, Item $item, Offer $offer)
    {
        $offer->customUpdate($request->validated());

        session()->flash('message', __('offer has updated'));

        return redirect()->route('items.offers.index', $item);
    }


    public function destroy(Item $item, Offer $offer)
    {
        $offer->delete();

        session()->flash('message', __('offer has destroyed'));
    }
}
