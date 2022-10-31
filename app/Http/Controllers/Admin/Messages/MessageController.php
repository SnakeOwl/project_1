<?php

namespace App\Http\Controllers\Admin\Messages;

use App\Models\Message;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::active()->paginate(25);

        return Inertia::render('Admin/Messages/MessageIndex',
            compact('messages'));
    }
}
