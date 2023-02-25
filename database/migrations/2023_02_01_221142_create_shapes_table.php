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
        Schema::create('shapes', function (Blueprint $table) {
            $table->comment('Таблица для определения параметров торговых предложений по категориям.');

            $table->id();
            $table->foreignId('category_id');
            $table->string('name');
            $table->string('name_en');
            $table->boolean('global')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shapes');
    }
};
