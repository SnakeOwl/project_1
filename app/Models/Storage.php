<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Storage extends Model
{
    use HasFactory;

    public function get_schedule()
    {
        return nl2br($this->schedule);
    }

    public function get_phone_link()
    {
        $result = "tel:+";
        $chars = str_split($this->phone);

        foreach ($chars as $char) {
            if ($char >= 0 && $char <= 9)
                $result .= $char;
        }

        return $result;
    }

    public $timestamps = false;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'schedule'
    ];

    protected $table = "storages";
}
