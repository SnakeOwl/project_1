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

    protected $imageFolder = "images";

    protected $attributes = [
        'hit' => 0,
        'new' => 1,
        'discount' => 0,
    ];

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

    protected $hidden = [
        'created_at',
        'deleted_at',
        'updated_at',
    ];

    // сохраняет файл на диске, возвращает путь к файлу
    // return path or false
    public function storeImage($file)
    {
        if (isset($file))
            return $file->store($this->imageFolder);
        return false;
    }

    // обновляет маленькую картинку, с удалением текущей
    // return path or false
    public function updateShortImage($file)
    {
        if (isset($file))
        {
            if (isset($this->short_image))
            {
                Storage::delete($this->short_image); // delete old image
            }
            return $this->storeImage($file);
        }
        return false;
    }

    // сохраняет и синхронизирует картинки с текущим объектом
    public function uploadGalery($images)
    {
        if (isset($images))
        {
            foreach ($images as $file)
            {
                if ($file->isValid())
                {
                    $this->images()->create(['image' => $this->storeImage($file)]);
                }
            }
        }

    }

    // проверяет старые изображения oldImages на необходимость удаления (удаляя при необходимости),
    public function autocleanGalery($checkImages)
    {
        if(count($this->images) != count($checkImages))
        {
            $ids = array();
            foreach($checkImages as $image)
            {
                $ids[] = $image["id"];
            }

            foreach ($this->images()->get('id') as $image)
            {
                if( !in_array($image->id, $ids))
                {
                    // Storage::delete($image->image);
                    Galery::find($image->id)->first()->delete();
                }
            }
        }
    }

    public function createUniqueParameters($parameters)
    {
        foreach($parameters as $parameter)
        {
            if (!is_null($parameter[0]))
            {
                $this->parameters()->create([
                    'param_name' => $parameter[0],
                    'param_value' => $parameter[1],
                ]);
            }
        }
    }

    public function customUpdate($params)
    {
        $params['alias'] = $params['name_en'] ?? transliterator_transliterate( 'Any-Latin; Latin-ASCII; Lower()', $params['name']);
        if ($params->shortImage !== null)
        {
             $params['short_image'] = $this->updateShortImage($params->shortImage);
        }

        $this->update($params->all());

        $this->properties()->sync($params['itemSkuProperties']);
        $this->autocleanGalery($params->itemGalery ?? array());
        $this->uploadGalery($params->newItemGalery ?? array());

        $this->parameters()->delete();
        $this->createUniqueParameters($params->itemParameters);
    }

    public function customCreate($params)
    {
        $this->name = $params['name'];
        $this->name_en = $params['name_en'];
        $this->alias = $params['name_en'] ?? transliterator_transliterate( 'Any-Latin; Latin-ASCII; Lower()', $params['name']);
        $this->description = $params['description'];
        $this->description_en = $params['description_en'];
        $this->category_id = $params['category_id'];

        if ($params->shortImage !== null)
        {
             $this->short_image = $this->storeImage($params->shortImage);
        }

        $this->save();

        $this->properties()->sync($params['itemSkuProperties']);
        $this->uploadGalery($params->newItemGalery ?? array());
        $this->createUniqueParameters($params->itemParameters);
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

    //SkuProperties
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

    //Unikue Parameters
    public function parameters()
    {
        return $this->hasMany(Parameter::class);
    }

    // return array of properties, packed like: [number] => [paramName, paramValue]
    public function getParametersSimpleFormat()
    {
        $result = array();
        $properties = $this->parameters;
        foreach($properties as $property)
        {
            $result[] = [$property->param_name , $property->param_value];
        }

        return $result;
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
