<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateMessageRequest;
use App\Models\Message;

class CreateMessageController extends Controller
{
    public function __invoke(CreateMessageRequest $request)
    {
        Message::create($request->safe()->all());
        session()->flash('message', 'Спасибо! Ваше письмо было отправлено (ɔ◔‿◔)ɔ ♥');
        return redirect()->back();
    }
}
