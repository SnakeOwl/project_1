<?php

namespace App\Observers;

use App\Models\Offer;
use App\Models\Subscription;

class OfferObserver
{
    public function created(Offer $offer)
    {
        //
    }

    public function updated(Offer $offer)
    {
        $oldCount = $offer->getOriginal('count');
        if ($oldCount == 0 && $offer->count > 0)
            Subscription::sendEmailToSubscriptions($offer);
    }

    public function deleted(Offer $offer)
    {
        //
    }

    public function restored(Offer $offer)
    {
        //
    }

    public function forceDeleted(Offer $offer)
    {
        //
    }
}
