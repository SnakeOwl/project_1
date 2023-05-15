<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('storages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_en');
            $table->string('address');
            $table->string('address_en');
            $table->string('phone')->nullable();
            $table->text('schedule');
            $table->text('schedule_en');
        });
    }

    public function down()
    {
        Schema::dropIfExists('storages');
    }
};
