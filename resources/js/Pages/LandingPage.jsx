import { Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import LinkButton from "@/Components/LinkButton";

export default function LandingPage({  }) {


    return (
        <>
            <Head title="Todo en un solo lugar" />
            <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center">
                <ApplicationLogo className="w-28" />
                <h1 className="text-2xl text-white font-bold my-5">
                    Kite App <span className="text-sm">v0.75</span>
                </h1>
                <div className="grid grid-cols-2 gap-4">
                    <LinkButton
                        disabled={false}
                        href={route("login")}
                        title="Iniciar sesión"
                    />
                    <LinkButton
                        disabled={false}
                        href={route("register")}
                        title="Crear cuenta"
                    />
                </div>
            </div>
        </>
    );
}
