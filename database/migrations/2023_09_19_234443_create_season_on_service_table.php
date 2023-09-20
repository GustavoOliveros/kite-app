<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('season_on_service', function (Blueprint $table) {
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('season_id');

            $table->string('quality');
            $table->string('link');
            $table->timestamp('leaving');
            $table->timestamp('available_since');  
            $table->timestamps();

            $table->primary(['service_id', 'season_id']);
            $table->foreign('service_id')
                ->references('id')
                ->on('services');
            $table->foreign('season_id')
                ->references('id')
                ->on('seasons');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('season_on_service');
    }
};
