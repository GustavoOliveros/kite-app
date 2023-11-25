@component('mail::message')
# Hola,

El título «{{ $title }}» {{ $type }}.

@component('mail::button', ['url' => 'http://127.0.0.1:8000/title/' . $titleId])
Ir al título
@endcomponent

El equipo de {{ config('app.name') }}

@endcomponent
