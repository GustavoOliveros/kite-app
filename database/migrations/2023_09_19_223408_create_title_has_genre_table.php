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
        Schema::create('title_has_genre', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('genre_id');
            $table->unsignedBigInteger('title_id');
            $table->timestamps();
            
            $table->foreign('genre_id')
                ->references('id')
                ->on('genres');
            $table->foreign('title_id')
                ->references('id')
                ->on('titles'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('title_has_genre');
    }
};
