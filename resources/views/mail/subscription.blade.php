<h1>{{$sku->item->name}} появился в наличии</h1>
<p>Уважаемый клиент, товар {{$sku->item->name}} появился в наличии. Вы можете его заказать на нашем сайте: <a href="{{route('catalog-sku', [$sku->item->category->alias, $sku->item->alias, $sku])}}">Подробнее</a></p>
