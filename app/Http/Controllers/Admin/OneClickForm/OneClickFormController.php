<?php

namespace App\Http\Controllers\Admin\OneClickForm;

use App\Http\Controllers\Controller;
use App\Models\OneClickForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OneClickFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $forms = OneClickForm::paginate(25);
        return Inertia::render('Admin/OneClickForm/Index', compact('forms'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OneClickForm  $oneClickForm
     * @return \Illuminate\Http\Response
     */
    public function destroy(OneClickForm $oneClickForm)
    {
        $oneClickForm->delete();

        session()->flash('message', __('info.oneClickForm destroyed'));
    }
}
