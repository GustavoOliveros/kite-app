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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('title_id');
            $table->unsignedBigInteger('service_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->string('type')->default('service');
            $table->timestamp('release_date')->nullable();

            $table->integer('status')->default(0); // 0 inactivo, 1 activo, 2 mail enviado, 3 leido

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
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
        Schema::dropIfExists('reminders');
    }
};
