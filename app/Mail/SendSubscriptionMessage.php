<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\sku;

class SendSubscriptionMessage extends Mailable
{
    use Queueable, SerializesModels;

    protected $sku;

    public function __construct(Sku $sku)
    {
        $this->sku = $sku;
    }

    public function build()
    {
        return $this->view('mail.subscription', ['sku' => $this->sku]);
    }
}
