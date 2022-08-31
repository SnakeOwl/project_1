<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendSubscriptionMessage;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable =['email', 'sku_id'];

    public function scopeBySkuId($query, $skuId)
    {
        return $query->where('sku_id', $skuId);
    }

    public function sku()
    {
        return $this->belongsTo(Sku::class);
    }

    public static function sendEmailToSubscriptions(Sku $sku)
    {
        $subscriptions = self::bySkuId($sku->id)->get();
        foreach ($subscriptions as $sub)
        {
            Mail::to($sub->email)->send(new SendSubscriptionMessage($sku));
            $sub->status = 1;
            $sub->save();
        }
    }
}
