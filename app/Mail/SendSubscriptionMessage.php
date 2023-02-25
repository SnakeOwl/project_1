<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Offer;

class SendSubscriptionMessage extends Mailable
{
    use Queueable, SerializesModels;

    protected $offer;

    public function __construct(Offer $offer)
    {
        $this->offer = $offer;
    }

    public function build()
    {
        return $this->view('mail.subscription', ['offer' => $this->offer]);
    }
}
