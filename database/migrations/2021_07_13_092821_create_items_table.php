<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index()->unique();
            $table->string('name_en')->index()->unique()->nullable();
            $table->string('alias')->index()->unique();
            $table->text('description');
            $table->text('description_en')->nullable();
            $table->string('short_image')->nullable();
            $table->decimal('current_rating', 2, 1)->default(0);
            $table->unsignedTinyInteger('discount')->default(0);
            $table->boolean('new')->index()->default(1);
            $table->boolean('hit')->index()->default(0);

            $table->foreignId('category_id')->constrained('categories');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
