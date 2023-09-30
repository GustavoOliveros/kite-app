<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class NoAccessApp
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()->hasAnyRole(Role::all())) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}