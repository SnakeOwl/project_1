<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->comment('Таблица для тестирования работы с api. Возможно найду ей применение.');

            $table->id();
            $table->string('name')->unique();
            $table->string('email');
            $table->string('api_token')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('merchants');
    }
};
