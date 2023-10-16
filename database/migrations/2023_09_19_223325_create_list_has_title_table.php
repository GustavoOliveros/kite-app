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
        Schema::create('list_has_title', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('title_id');
            $table->unsignedBigInteger('playlist_id');
            $table->timestamps();

            $table->foreign('title_id')
                ->references('id')
                ->on('titles');
            $table->foreign('playlist_id')
                ->references('id')
                ->on('playlists');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_has_title');
    }
};
