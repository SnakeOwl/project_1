<?php

namespace App\Http\Controllers\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Messages\StoreMessageRequest;
use App\Models\Message;

class StoreMessageController extends Controller
{
    public function __invoke(StoreMessageRequest $request)
    {
        Message::create($request->validated());
        session()->flash('message', __('info.thanks for the message'));
    }
}
