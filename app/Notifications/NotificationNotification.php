<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $titleId;
    protected $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($title, $titleId, $type, $service = "")
    {
        $this->title = $title;
        $this->titleId = $titleId;
        $this->type = $type === 'release' ? 'se ha estrenado' : 'ha llegado a ' . $service;
    }

    /**«
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("«{$this->title}» {$this->type}")
            ->markdown('emails.notification', [
                'title' => $this->title,
                'titleId' => $this->titleId,
                'type' => $this->type
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
