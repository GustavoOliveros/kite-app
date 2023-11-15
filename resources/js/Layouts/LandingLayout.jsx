import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { FooterWithLogo } from "./partials/Footer";
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

export default function Landing({ children }) {
    const [navColor, setnavColor] = useState("transparent");

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#000") : setnavColor("transparent");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <>
            <div
                className="min-h-[80vh] pt-6 sm:pt-0 bg-zinc-900 bg-no-repeat bg-cover bg-fixed flex justify-center relative"
                style={{
                    backgroundImage:
                        'url("https://cnbl-cdn.bamgrid.com/assets/83d930a475cae0e29d47b7c529075c7c25f0650207a8dd036dcabdfeecb03930/original")',
                }}
            >
                <nav
                    className="p-1 md:p-0 hidden md:block md:fixed md:top-0 w-screen z-20 bg-gray"
                    style={{
                        backgroundColor: navColor,
                        transition: "all 0.5s",
                    }}
                >
                    <div className="max-w-7xl mx-auto hidden md:flex justify-center md:justify-between h-16 items-center">
                        <div className="flex items-center text-white gap-2">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route("login")}>
                                <Button className="bg-black border-2 border-white rounded-3xl">
                                    Iniciar Sesión
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button className="bg-white border-2 border-black rounded-3xl text-black">
                                    Crear Cuenta
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className=" text-white w-full max-w-7xl flex items-center">
                    <div className="text-center md:text-start">
                        <h1 className="text-xl font-bold">
                            Kite - <span className="text-sm">v1.0</span>
                        </h1>
                        <h2 className="text-3xl font-bold mb-2">
                            Todo en un solo lugar
                        </h2>
                        <h3>
                            <strong>Navegá</strong> el catalogo de <strong>todos tus servicios</strong> de
                            streaming <strong>juntos</strong>.
                        </h3>
                        <Link href={route("register")}>
                            <Button className="bg-white border-2 border-black rounded-3xl text-black mt-2">
                                Crear Cuenta
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
            <main>{children}</main>
            <FooterWithLogo mobile={true} />
        </>
    );
}
