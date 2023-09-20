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
        Schema::create('titles', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('original_title');
            $table->string('title');
            $table->string('year');
            $table->string('poster_path')->nullable();
            $table->string('backdrop_path')->nullable();
            $table->boolean('status');
            $table->boolean('availability_status');
            $table->string('overview');

            $table->timestamp('disabled_at')->nullable();
            $table->string('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('titles');
    }
};
