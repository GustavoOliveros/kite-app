<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Requests\ProfileUpdateRequest;
use App\Notifications\UsernameChangeNotification;
use App\Notifications\UsernameEmailChangeNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $flag = false;

        if($request->input('email') !== null){
            $request->user()->notify(new UsernameEmailChangeNotification);
        }else{
            $request->user()->notify(new UsernameChangeNotification);
        }

        $request->user()->fill($request->validated());

        if($request->user()->isDirty('email')){
            $request->user()->email_verified_at = null;
            $flag = true;
        }

        $request->user()->save();

        if($flag){
            $request->user()->sendEmailVerificationNotification();
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
