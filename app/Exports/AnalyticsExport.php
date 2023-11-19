<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AnalyticsExport implements FromCollection,WithHeadings
{
    protected $collection;

    public function __construct($collection)
    {
        $this->collection = $collection;
    }


    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        return [
            'Pos.',
            'Item ID',
            'Item',
            'Cantidad',
        ];
    }
    public function collection()
    {
        $response = [];
        $responseAux = [];

        $collection = $this->collection;

        for($i = 0; $i < count($collection); $i++){
            $response['pos'] = $i + 1;
            $response['itemId'] = $collection[$i]['service_id'] ?? $collection[$i]['title_id'];
            $response['item'] = $collection[$i]['name'] ?? $collection[$i]['title'];


            if(isset($collection[$i]['view_count'])){
                $response['cantidad'] = $collection[$i]['view_count'];
            }elseif(isset($collection[$i]['review_average'])){
                $response['cantidad'] = "{$collection[$i]['review_average']} ({$collection[$i]['review_count']})";
            }else {
                $response['cantidad'] = $collection[$i]['review_count'];
            }

            $responseAux[] = $response;
        }

        $collection = collect($responseAux);

        return $collection;
    }
}