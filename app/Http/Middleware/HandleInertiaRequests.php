<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use App\Models\Reminder;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if($request->user()){
            $permissions = $request->user()->getAllPermissions()->pluck('name');
        }

        $unreadNotifications = Reminder::where('user_id', Auth::user()->id)
            ->where('status', '>', 0)
            ->where('status', '<', 3)
            ->count();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'permissions' => $permissions ?? [],
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'unreadNotifications' => $unreadNotifications
        ];
    }
}
