<?php

namespace App\Http\Controllers\Admin\Messages;

use App\Models\Message;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::paginate(25);

        return Inertia::render('Admin/Messages/Index', compact('messages'));
    }

    public function destroy(Message $message)
    {
        $message->delete();
        session()->flash('message', __('info.message destroyed'));
    }
}
