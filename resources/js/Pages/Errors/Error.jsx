import PrimaryButton from "@/Components/PrimaryButton";
import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";

export default function Error(status) {
    const errors = 
    {
        "403": "No tiene permisos para acceder a esta página.",
        "404": "La página solicitada no es válida o fue borrada.",
        "419": "La página expiró.",
    }

    const errorMessage = errors[status.status];

    return (
        <>
            <Head title={status.status} />
            <Guest>
                <h1 className="text-5xl">{status.status}</h1>
                <p>{errorMessage != undefined ? errorMessage : 'Ocurrió un error. Inténtelo de nuevo más tarde.'}</p>
                <Link href='/'>
                    <PrimaryButton className="my-2">Volver al Inicio</PrimaryButton>
                </Link>
            </Guest>
        </>
    );
}
