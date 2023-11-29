<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Http\Controllers\ChangesController;
use Illuminate\Support\Facades\Log;
use App\Models\ChangesLog;
use Illuminate\Support\Carbon;
use App\Models\Reminder;
use App\Notifications\NotificationNotification;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Cambios
        // $schedule->call(function () {
        //     $objChanges = new ChangesController;
        //     $objChanges->perform(); 
        // })->everySixHours();

        // Borrado de logs semanal
        // $schedule->call(function (){
        //     $weekAgo = Carbon::now()->subWeek();
        //     $logs = ChangesLog::where('created_at', '<', $weekAgo)->get();

        //     $logs->each(function ($log) {
        //         $log->delete();
        //     });
        // })->weekly();

        // Actualizar recordatorios de estreno
        $schedule->call(function(){
            Reminder::where('release_date', '<', now())->where('status', 0)->update(['status' => 1]);
        })->everyThirtySeconds();
        
        // Borrado de recordatorios leídos diario
        $schedule->call(function(){
            Reminder::where('status', 3)->delete();
        })->everyThirtySeconds();

        // Envio de mails (notificaciones)
        $schedule->call(function(){
            $reminder = Reminder::where('status', 1)->first();
            
            if($reminder){
                $user = $reminder->user;

                $title = $reminder->title;
                $service = $reminder->type === 'release' ? "" : $reminder->service->name;

                $user->notify(new NotificationNotification($title->title, $title->id, $reminder->type, $service));

                $reminder->status = 2;
                $reminder->save();
            }  
        })->everyThirtySeconds();
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
