<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * Prepare exception for rendering.
     *
     * @param  \Throwable  $e
     * @return \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        // if (!app()->environment(['local', 'testing']) && in_array($response->status(), [500, 503, 404, 403])) {
        //     return Inertia::render('Errors/Error', ['status' => $response->status()])
        //         ->toResponse($request)
        //         ->setStatusCode($response->status());
        // } else if ($response->status() === 419) {
        //     return back()->with([
        //         'message' => __('The page expired, please try again.'),
        //     ]);
        // }

        if(in_array($response->status(), [500, 503, 404, 403, 419])){
            return Inertia::render('Errors/Error', ['status' => $response->status()])
                ->toResponse($request)
                ->setStatusCode($response->status());

        }

        return $response;
    }

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
