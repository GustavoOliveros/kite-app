import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar Correo Electrónico" />

            <div className="mb-4 text-sm text-gray-600">
                Gracias por registrarse. Para entrar a la aplicación, verifique su correo electrónico haciendo
                clic al enlace que le enviamos. Si aún no lo recibe, haga clic en el botón para que le enviemos
                uno nuevo.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Le hemos enviado un nuevo enlace de verificación.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>Reenviar enlace de verificación</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
