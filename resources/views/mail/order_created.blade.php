<h1>@lang('mail.order_created.header') {{$order->id}}</h1>
<p>@lang('mail.order_created.greetings') {{$order->name}}</p>
<p>@lang('mail.order_created.full price') {{$full_price}}</p>

<h2>@lang('mail.order_created.items table header')</h2>
<table>
    <thead>
        <tr>
            <th>@lang('mail.order_created.items table row 1')</th>
            <th>@lang('mail.order_created.items table row 2')</th>
            <th>@lang('mail.order_created.items table row 3')</th>
            <th>@lang('mail.order_created.items table row 4')</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($order->offers as $offer)
        <tr>
            <td><img src="{{ Storage::url($offer->item->short_image) }}" width="200" alt="Изображение"></td>
            <td><span class="basket-item-name">{{$offer->item->name}}</span></td>
            <td>
                <span>{{$offer->countInOrder}}</span>
            </td>
            <td class="text-end"><span>{{$offer->price}} {{$order->currency->symbol}}</span></td>
        </tr>
        @endforeach
    </tbody>
</table>
<h3>Итого к оплате: {{$order->price}} {{$order->currency->symbol}}</h3>
