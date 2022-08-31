<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests\CreateMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Models\Contact;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::active()->paginate(25);
        return view('admin.contacts.index', compact('contacts') );
    }

    public function edit(Contact $contact)
    {
        return view('admin.contacts.edit', compact('contact') );
    }

    public function update(UpdateMessageRequest $request, Contact $contact)
    {
        $contact->update($request->safe()->all());
        session()->flash('info', 'Письмо прочитано');

        return redirect()->route('contacts.index');
    }
}
