<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Support\Facades\Storage;
use App\Classes\Currency\CurrencyConverter;
use App\Models\Traits\Filterable;

class Offer extends Model
{
    use HasFactory, SoftDeletes, Filterable;

    protected $fillable = [
        'item_id',
        'count',
        'price',
        'current_rating',
        'short_image',
    ];

    protected $hidden = [
        'created_at',
        'deleted_at',
        'updated_at',
        'item_id'
    ];

    public function customCreate($params)
    {
        if(isset($params['shortImage']))
            $params['short_image'] = $this->storeImage($params['shortImage']);

        $offer = $this->create($params);
        $offer->shapeOptions()->sync($params['optionsIDs']);
        $offer->uploadGalery($params['newGaleryImages'] ?? array());
    }

    public function customUpdate($params)
    {
        if(isset($params['shortImage']))
             $this->updateShortImage($params['shortImage']);

        $this->update($params);
        $this->shapeOptions()->sync($params['optionsIDs']);
        $this->autocleanGalery($params['galery'] ?? array());
        $this->uploadGalery($params['newGaleryImages'] ?? array());
    }


    // сохраняет файл на диске, возвращает путь к файлу или false
    public function storeImage($file)
    {
        if (isset($file))
            return $file->store( config('storage.default_images_folder') );

        return false;
    }

    // обновляет маленькую картинку, с удалением текущей
    public function updateShortImage($file)
    {
        if (isset($file))
        {
            if (isset($this->short_image))
                Storage::delete($this->short_image); // delete old image

            $this->short_image = $this->storeImage($file);
            $this->save();
        }
    }

    // сохраняет и синхронизирует картинки с текущим объектом
    public function uploadGalery($images)
    {
        if (isset($images))
            foreach ($images as $file)
                if ($file->isValid())
                    $this->images()->create(['url' => $this->storeImage($file)]);
    }

    // проверяет старые изображения oldImages на необходимость удаления (удаляя при необходимости),
    public function autocleanGalery($checkImages)
    {
        
        if(count($this->images) != count($checkImages))
        {
            $ids = array();
            foreach($checkImages as $image){
                $ids[] = $image["id"];
            }
            
            foreach ($this->images()->get('id') as $image)
            {
                if( !in_array($image->id, $ids))
                {
                    $image->delete();

                    if ($image->image !== null)
                    {
                        Storage::delete($image->image); //удаление с диска
                    }
                }
            }
        }
    }

    public function get_price_for_count(): float
    {
        if (!is_null ($this->pivot))
            return $this->price * $this->pivot->count;

        return $this->price;
    }

    public function scopeByCategory($query, $category_id)
    {
        return $query->whereHas('item', function($query) use($category_id) {
            $query->where('category_id', $category_id);
        });
    }

    public function scopeAvailable($query)
    {
        return $query->where('count', '>', 0);
    }

    public function isAvailable(): bool
    {
        return ($this->count > 0) && !$this->item->trashed();
    }

    public function baskets(): belongsToMany
    {
        return $this->belongsToMany(Basket::class)->withPivot('count');
    }

    public function item(): belongsTo
    {
        return $this->belongsTo(Item::class);
    }

    public function shapeOptions(): belongsToMany
    {
        return $this->belongsToMany(ShapeOption::class)->withTimestamps();
    }
    public function options(): belongsToMany
    {
        return $this->belongsToMany(ShapeOption::class)->withTimestamps();
    }

    public function images(): hasMany
    {
        return $this->hasMany(Galery::class);
    }


    public function getPriceAttribute($value): float
    {
        return round(CurrencyConverter::convert($value), 2);
    }
}
