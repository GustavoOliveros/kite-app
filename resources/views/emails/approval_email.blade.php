@component('mail::message')
# Hola,

El título sugerido por usted «{{ $title->title }}» fue aprobado y ya se encuentra en la plataforma.


@component('mail::button', ['url' => route('title.show', ['id' => $title->id])])
Ir al título
@endcomponent

Gracias por su apoyo al crecimiento del servicio.

El equipo de {{ config('app.name') }}

@endcomponent
