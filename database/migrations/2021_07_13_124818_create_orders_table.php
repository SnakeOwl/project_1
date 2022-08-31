<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Не указано');
            $table->boolean('payment_status')->default(0);  //статус оплаты
            $table->string('payment_method');   //метод оплаты
            $table->string('delivery_method');  //способ доставки
            $table->string('address')->nullable();
            $table->string('post_index')->nullable();    //почтовый индекс
            $table->unsignedTinyInteger('discount')->default(0);
            $table->string('phone');
            $table->decimal('price', 13, 2);    // сумма заказа
            $table->string('status')->default('Обрабатывается');
            $table->dateTime('date_delivered')->nullable();

            $table->foreignId('promocode_id')->nullable();
            $table->foreignId('storage_id')->nullable();
            $table->foreignId('currency_id');

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
        Schema::dropIfExists('orders');
    }
}
