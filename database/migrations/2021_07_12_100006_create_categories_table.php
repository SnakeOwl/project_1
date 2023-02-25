<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string("name")->unique();
            $table->string("name_en")->unique()->nullable();
            $table->string("alias")->unique();
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
