<?php
namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use Inertia\Inertia;

class CatalogDetailController extends Controller
{
    public function __invoke($category_alias, $item_alias, Sku $sku)
    {
        if ($sku->item->alias != $item_alias)
            abort(404);

        $sku->propertyOptions = $sku->propertyOptions()->with('property')->get();
        $sku->item->parameters;
        $sku->item->images;
        $skuIsAvailable = $sku->isAvailable();

        return Inertia::render('Catalog/SkuDetails', compact('sku', 'skuIsAvailable'));
    }
}
