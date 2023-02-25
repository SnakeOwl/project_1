<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use App\Models\Order;

class ShowPersonalOrderRequest extends FormRequest
{

    public function authorize(Order $order)
    {
        // return Gate::authorize('update-order', $order);
        // return $this->user()->can('update-order', $order);
        return true;
    }


    public function rules()
    {
        return [
            //
        ];
    }
}
