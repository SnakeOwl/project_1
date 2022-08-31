<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Translatable;
use Illuminate\Support\Facades\Storage;

class Item extends Model
{
    use SoftDeletes, Translatable, HasFactory;

    protected $fillable = [
        'name',
        'name_en',
        'alias',
        'description',
        'description_en',
        'short_image',
        'discount',
        'category_id',
        'new',
        'hit',
    ];

    public function updateItem($params)
    {
        $params['hit'] = $params['hit'] ?? 0;
        $params['new'] = $params['new'] ?? 0;
        $params['alias'] = $params['name_en'] ?? transliterator_transliterate( 'Any-Latin; Latin-ASCII; Lower()', $params['name']);
        $this->update($params);

        $this->properties()->sync($params['property_id']);

        //delete old unique parameters
        $this->parameters()->delete();
        // save unique parameters
        $count = count($params['param_key']);
        for ($i = 0; $i < $count; $i++)
        {
            if (!is_null($params['param_key'][$i]))
            {
                Parameter::create([
                    'item_id' => $this->id,
                    'param_name' => $params['param_key'][$i],
                    'param_value' => $params['param_val'][$i],
                ]);
            }
        }

        // old_images приходят от формы
        $old_images = is_array($params['old_images'])? $params['old_images'] : array();
        // далее сравниваются и из модели удаляются лишние
        if(count($this->images) != count($old_images))
        {
            foreach ($this->images as $image)
            {
                if( !in_array($image->image , $old_images))
                {
                    Storage::delete($image->image);
                    Galery::find($image->id)->delete();
                }
            }
        }

        // insert new galery images
        if(isset($params['galery']))
        {
            foreach ($params['galery'] as $imgPath)
            {
                Galery::create(['item_id' => $this->id, 'image' => $imgPath]);
            }
        }
    }

    public function createItem($params)
    {
        $this->name = $params['name'];
        $this->name_en = $params['name_en'];
        $this->alias = $params['name_en'] ?? transliterator_transliterate( 'Any-Latin; Latin-ASCII; Lower()', $params['name']);
        $this->description = $params['description'];
        $this->description_en = $params['description_en'];
        $this->short_image = $params['short_image'] ?? null;
        $this->discount = $params['discount'] ?? 0;
        $this->category_id = $params['category_id'];
        $this->new = $params['new'] ?? false;
        $this->hit = $params['hit'] ?? false;
        $this->save();

        if(isset($params['property_id']))
        {
            $this->properties()->attach($params['property_id']);
        }

        // save galery for carousel on detail page
        if(isset($params['galery']))
        {
            foreach ($params['galery'] as $imgPath)
            {
                Galery::create(['item_id' => $this->id, 'image' => $imgPath]);
            }
        }

        // save unique parameters
        $count = count($params['param_key']);
        for ($i = 0; $i < $count; $i++)
        {
            if (!is_null($params['param_key'][$i]))
            {
                Parameter::create([
                    'item_id' => $this->id,
                    'param_name' => $params['param_key'][$i],
                    'param_value' => $params['param_val'][$i],
                ]);
            }
        }
    }

    public function isHit()
    {
        return $this->hit === 1;
    }

    public function isNew()
    {
        return $this->new === 1;
    }

    public function skus()
    {
        return $this->hasMany(Sku::class);
    }

    public function properties()
    {
        return $this->belongsToMany(Property::class);
    }

    public function scopeHit($query)
    {
        return $query->where('hit', 1);
    }
    public function scopeNew($query)
    {
        return $query->where('new', 1);
    }

    public function getDescription()
    {
        return  nl2br($this->__('description'));
    }

    public function parameters()
    {
        return $this->hasMany(Parameter::class);
    }

    public function images()
    {
        return $this->hasMany(Galery::class);
    }

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }
}
