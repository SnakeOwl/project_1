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
        Schema::create('basket_offer', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(App\Models\Basket::class);
            $table->foreignIdFor(App\Models\Offer::class);
            $table->unsignedTinyInteger('count');
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
        Schema::dropIfExists('basket_offer');
    }
};

