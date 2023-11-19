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
        return $this->collection;
    }
}