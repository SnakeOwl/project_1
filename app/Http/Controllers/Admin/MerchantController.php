<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\MerchantRequest;
use App\Models\Merchant;
use App\Http\Controllers\Controller;

class MerchantController extends Controller
{
    public function updateToken(Merchant $merchant)
    {
        $token = $merchant->updateToken();
        session()->flash('info', 'Токен обновлен: ' . $token);
        return redirect()->route('merchants.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $merchants = Merchant::paginate(25);
        return view('admin.merchants.index', compact('merchants'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.merchants.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMerchantRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MerchantRequest $request)
    {
        Merchant::create($request->safe()->all());
        session()->flash('info', 'Поставщик добавлен');
        return redirect()->route('merchants.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function show(Merchant $merchant)
    {
        return view('admin.merchants.show', compact('merchant'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function edit(Merchant $merchant)
    {
        return view('admin.merchants.form', compact('merchant'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMerchantRequest  $request
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function update(MerchantRequest $request, Merchant $merchant)
    {
        $merchant->update($request->safe()->all());
        session()->flash('info', 'Поставщик изменен');
        return redirect()->route('merchants.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Merchant  $merchant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Merchant $merchant)
    {
        $merchant->delete();
        session()->flash('info', 'Поставщик удален');
        return redirect()->route('merchants.index');
    }
}
