<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Title;

class TitleRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'tmdb_id' => 'required|string|unique:' . Title::class,
            'media_type' => 'required|string',
            'title' => 'required_if:name,null|string',
            'name' => 'required_if:title,null|string',
            'original_title' => 'required_if:original_name,null|string',
            'original_name' => 'required_if:original_title,null|string',
            'release_date' => 'required_if:first_air_date,null|string',
            'first_air_date' => 'required_if:release_date,null|string',
            'poster_path' => 'nullable',
            'backdrop_path' => 'nullable',
        ];
    }

    public function messages(){
        return [
            'tmdb_id.unique' => "El título ya existe.",
            'required' => 'Ocurrió un error. Inténtelo de nuevo más tarde.',
            'string' => 'Ocurrió un error. Inténtelo de nuevo más tarde.',
            'required_if' => 'Ocurrió un error. Inténtelo de nuevo más tarde.',
            'nullable' => 'Ocurrió un error. Inténtelo de nuevo más tarde.',
        ];
    }
}
