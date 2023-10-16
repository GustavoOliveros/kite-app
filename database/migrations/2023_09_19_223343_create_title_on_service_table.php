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
        Schema::create('title_on_service', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('title_id');
            $table->string('quality');
            $table->string('link');
            $table->timestamp('leaving')->nullable();
            $table->timestamp('available_since')->nullable();  
            $table->timestamps();
            
            $table->foreign('title_id')
            ->references('id')
            ->on('titles');
            $table->foreign('service_id')
                ->references('id')
                ->on('services');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('title_on_service');
    }
};
