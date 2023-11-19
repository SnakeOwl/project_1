<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Translatable;
use Database\Factories\ItemFactory;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Item extends Model
{
    use SoftDeletes, HasFactory, Translatable;


    protected $fillable = [
        'category_id',
        'name',
        'name_en',
        'alias',
        'description',
        'description_en',
    ];

    protected $hidden = [
        'created_at',
        'deleted_at',
        'updated_at',
    ];

    public function createUniqueParameters($parameters)
    {
        foreach($parameters as $parameter)
            if ($parameter['param_name'] !== null)
                $this->parameters()->create($parameter);
    }

    public function customUpdate($params)
    {
        $params['alias'] = $params['name_en']
            ?? transliterator_transliterate('Any-Latin; Latin-ASCII; Lower()', $params['name']);

        $this->update($params);

        $this->parameters()->delete();
        $this->createUniqueParameters($params["parameters"]);
    }

    public function customCreate($params)
    {
        $parameters = $params['parameters'];
        unset($params['parameters']);

        $params['alias'] = $params['name_en']
            ?? transliterator_transliterate( 'Any-Latin; Latin-ASCII; Lower()', $params['name']);

        $item = $this->factory($params)->create();

        $item->createUniqueParameters($parameters);
    }


    // owner, partner
    public function user(): belongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function offers(): hasMany
    {
        return $this->hasMany(Offer::class);
    }

    public function parameters(): hasMany
    {
        return $this->hasMany(Parameter::class);
    }

    public function category(): belongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
