<?php

namespace App\Http\Controllers\Admin\Messages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageReadController extends Controller
{
    public function __invoke(Message $message)
    {
        $message->update(['active' => 0]);

        session()->flash('message', __('message was read'));

        return redirect()->route('messages.index');
    }
}
