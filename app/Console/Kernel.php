<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\ChangesController;
use Illuminate\Support\Facades\Log;
use App\Models\ChangesLog;
use Illuminate\Support\Carbon;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->call(function () {
        //     $objChanges = new ChangesController;
        //     $objChanges->perform(); 
        // })->everySixHours();

        // $schedule->call(function (){
        //     $weekAgo = Carbon::now()->subWeek();
        //     $logs = ChangesLog::where('created_at', '<', $weekAgo)->get();

        //     $logs->each(function ($log) {
        //         $log->delete();
        //     });
        // })->weekly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
