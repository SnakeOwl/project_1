<?php

namespace App\Http\Controllers\Api\Contacts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\MessageStoreRequest;
use App\Models\Message;

class MessageStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MessageStoreRequest $request)
    {
        Message::create($request->validated());
        
        return ["message" => "message created"];
    }
}
