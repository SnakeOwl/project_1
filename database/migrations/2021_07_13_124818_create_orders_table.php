<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('payment_status')->default(0);
            $table->string('payment_method');
            $table->string('delivery_method');
            $table->string('address')->nullable();
            $table->string('post_index', 12)->nullable();
            $table->string('phone', 16);
            $table->decimal('price', 13, 2);
            $table->string('status');
            $table->dateTime('date_delivered')->nullable();
            $table->decimal('current_rating', 2, 1)->default(0);


            $table->foreignId('user_id')->nullable();
            $table->foreignId('courier_id')->nullable();
            $table->foreignId('promocode_id')->nullable();
            $table->foreignId('storage_id')->nullable();
            $table->foreignId('currency_id');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
