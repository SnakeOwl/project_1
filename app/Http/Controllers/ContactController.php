<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Contact;

class ContactController extends Controller
{
    public function create()
    {
        return view('support-form');
    }

    public function store(CreateMessageRequest $request)
    {
        Contact::create($request->safe()->all());
        session()->flash('info', 'Спасибо! Ваше письмо было отправлено :)');

        return redirect()->route('support.create');
    }
}
