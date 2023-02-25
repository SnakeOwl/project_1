<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('galeries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('offer_id')->index();
            $table->string('url');
        });
    }

    public function down()
    {
        Schema::dropIfExists('galeries');
    }
};
