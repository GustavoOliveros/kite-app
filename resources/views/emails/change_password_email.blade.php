@component('mail::message')
# Hola,

Acaba de cambiar la contraseña en su cuenta de {{ config('app.name') }}.

Si fue usted, no es necesaria ninguna acción. Caso contrario, contacte a **support@kite.com** para instrucciones.

El equipo de {{ config('app.name') }}

@endcomponent
