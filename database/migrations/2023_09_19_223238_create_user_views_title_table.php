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
        Schema::create('user_views_title', function (Blueprint $table) {
            $table->unsignedBigInteger('title_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('service_id');
            $table->integer('view_count');
            $table->timestamps();
        
            $table->primary(['title_id', 'user_id', 'service_id']);
            $table->foreign('title_id')
                ->references('id')
                ->on('titles');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
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
        Schema::dropIfExists('user_views_title');
    }
};
