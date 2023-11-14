<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Title;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = [];

        try{
            $review = new Review;
            $review->star_number = $request->input('star_number');
            $review->review_text = $request->input('review_text');

            // user
            $user = User::find(Auth::user()->id);
            $review->user()->associate($user);

            //title
            $title = Title::find($request->input('title_id'));
            $review->title()->associate($title);

            $review->save();

            $this->calculateRating($request->input('title_id'));

            $response['type'] = 'success';
            $response['message'] = 'Se guardó con éxito.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;

        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $response = [];

        $reviews = Review::where('title_id', $id)
            ->join('users', 'reviews.user_id', '=', 'users.id')
            ->select('reviews.*', 'users.username')
            ->orderBy('created_at', 'desc')
            ->get();
            
        $userReview = Review::where('title_id', $id)->where('user_id', Auth::user()->id)->first();

        $response['allReviews'] = $reviews ?? [];
        $response['userReview'] = $userReview ?? [];

        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function calculateRating(string $titleId){
        $average = Review::where('title_id', $titleId)->avg('star_number');

        $average = round($average, 1);

        $title = Title::findOrFail($titleId);
        $title->rating = $average;
        $title->rating_amount++;
        $title->save();
    }

    public function getReviews(string $titleId){
        $response = [];

        $reviews = Review::where('title_id', $titleId)
            ->join('users', 'reviews.user_id', '=', 'users.id')
            ->select('reviews.*', 'users.username')
            ->orderBy('created_at', 'desc')
            ->get();

        $userReview = Review::where('title_id', $titleId)->where('user_id', Auth::user()->id)->first();

        $response['allReviews'] = $reviews ?? [];
        $response['userReview'] = $userReview ?? [];

        return response()->json($response);
    }
}
