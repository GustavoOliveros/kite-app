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
        Schema::create('user_likes_review', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('review_id');
            $table->timestamps();

            $table->primary(['user_id', 'review_id']);
            $table->foreign('user_id')
                ->references('id')
                ->on('users');
            $table->foreign('review_id')
                ->references('id')
                ->on('reviews'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_likes_review');
    }
};
