<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderCreated extends Mailable
{
    use Queueable, SerializesModels;

    protected $order;

    public function __construct(Order $order)
    {

        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $full_price = $this->order->get_full_price();
        return $this->view('mail.order_created', [
            'order' => $this->order,
            'full_price' => $full_price,
            ] );
    }
}
