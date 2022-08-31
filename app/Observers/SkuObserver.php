<?php

namespace App\Observers;

use App\Models\Sku;
use App\Models\Subscription;

class SkuObserver
{
    /**
     * Handle the Sku "created" event.
     *
     * @param  \App\Models\Sku $sku
     * @return void
     */
    public function created(Sku $sku)
    {
        //
    }

    /**
     * Handle the Sku "updated" event.
     *
     * @param  \App\Models\Sku $sku
     * @return void
     */
    public function updated(Sku $sku)
    {
        $old_count = $sku->getOriginal('count');
        if ($old_count == 0 && $sku->count > 0)
        {
            Subscription::sendEmailToSubscriptions($sku);
        }
    }

    /**
     * Handle the Sku "deleted" event.
     *
     * @param  \App\Models\Sku $sku
     * @return void
     */
    public function deleted(Sku $sku)
    {
        //
    }

    /**
     * Handle the Sku "restored" event.
     *
     * @param  \App\Models\Sku $sku
     * @return void
     */
    public function restored(Sku $sku)
    {
        //
    }

    /**
     * Handle the Sku "force deleted" event.
     *
     * @param  \App\Models\Sku $sku
     * @return void
     */
    public function forceDeleted(Sku $sku)
    {
        //
    }
}
