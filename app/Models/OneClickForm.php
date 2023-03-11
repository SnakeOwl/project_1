<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;


class OneClickForm extends Model
{
    use HasFactory;

    protected $fillable=[ 'phone', 'name', 'offer_id'];

    public function offer(): belongsTo
    {
        return $this->belongsTo(Offer::class);
    }
}
