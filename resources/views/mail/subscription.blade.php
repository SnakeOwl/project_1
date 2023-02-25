<h1>{{$offer->item->name}} появился в наличии</h1>
<p>Уважаемый клиент, товар {{$offer->item->name}} появился в наличии. Вы можете его заказать на нашем сайте: <a href="{{route('catalog-offer', [$offer->item->category->alias, $offer->item->alias, $offer])}}">Подробнее</a></p>
