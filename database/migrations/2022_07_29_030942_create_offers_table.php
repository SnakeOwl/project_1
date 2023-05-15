<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->comment('Торговые предложения товаров');

            $table->id();
            $table->unsignedSmallInteger('count')->default(0);
            $table->decimal('price', 11,2);
            $table->foreignId('item_id');
            $table->string('short_image')->nullable();
            $table->decimal('current_rating', 2,1)->nullable();
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offers');
    }
};
