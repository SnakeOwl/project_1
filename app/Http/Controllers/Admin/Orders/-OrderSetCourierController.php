<?php
namespace App\Http\Controllers\Admin\Orders;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderSetCourierController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {

        return redirect()->back();
    }
}
