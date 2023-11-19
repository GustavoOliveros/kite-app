<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PdfController extends Controller
{
    static public function store($data, $title, $path){
 
        $view = view('pdf/analytics', ['data' => $data, 'title' => $title])->render();

        $mpdf = new \Mpdf\Mpdf();

        $mpdf->WriteHTML($view);

        Storage::put($path, $mpdf->Output('', 'S'));
    }
}
