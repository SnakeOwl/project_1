<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendSubscriptionMessage;

class Subscription extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable =['email', 'offer_id'];

    public function scopeByOfferId($query, $offerId)
    {
        return $query->where('offer_id', $offerId);
    }

    public function offer(): belongsTo
    {
        return $this->belongsTo(Offer::class);
    }

    public static function sendEmailToSubscriptions(Offer $offer)
    {
        $subscriptions = self::byOfferId($offer->id)->get();
        foreach ($subscriptions as $sub)
        {
            Mail::to($sub->email)->send(new SendSubscriptionMessage($offer));
            $sub->status = 1;
            $sub->save();
        }
    }
}
