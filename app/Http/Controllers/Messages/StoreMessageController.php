<?php

namespace App\Http\Controllers\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\FormsMessages\StoreMessageRequest;
use App\Models\Message;

class StoreMessageController extends Controller
{
    public function __invoke(StoreMessageRequest $request)
    {
        Message::create($request->safe()->all());
        session()->flash('message', 'Спасибо! Ваше письмо было отправлено (ɔ◔‿◔)ɔ ♥');
        return redirect()->back();
    }
}
