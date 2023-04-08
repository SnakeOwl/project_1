<?php

namespace App\Http\Controllers\Api\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Http\Requests\Messages\StoreMessageRequest;

class StoreMessageController extends Controller
{
    public function __invoke(StoreMessageRequest $request)
    {
        Message::create($request->validated());

        return ["message" => __("info.thanks for the message")];
    }
}
