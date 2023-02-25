<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('offer_order', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id');
            $table->foreignId('offer_id');
            $table->unsignedSmallInteger('count')->default(1);
            $table->decimal('price', 11, 2);
        });
    }

    public function down()
    {
        Schema::dropIfExists('offer_order');
    }
};
