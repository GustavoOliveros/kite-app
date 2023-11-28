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
                        'url("https://imageio.forbes.com/specials-images/imageserve/62f65f10bf88451e43750f03/Streaming/0x0.jpg?crop=2745,1544,x0,y136,safe&height=399&width=711&fit=bounds")',
                }}
            >
                <nav
                    className="p-1 md:p-0  block absolute md:fixed top-0 w-screen z-20 bg-gray"
                    style={{
                        backgroundColor: navColor,
                        transition: "all 0.5s",
                    }}
                >
                    <div className="max-w-7xl mx-auto flex justify-center md:justify-between h-16 items-center">
                        <div className="flex items-center text-white gap-2">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route("login")}>
                                <Button className="bg-black border-2 hidden md:block border-white rounded-3xl">
                                    Iniciar Sesión
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button className="bg-white border-2 hidden md:block border-black rounded-3xl text-black">
                                    Crear Cuenta
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className=" text-white w-full max-w-7xl flex items-center z-10">
                    <div className="text-center md:text-start px-2">
                        <h1 className="text-xl font-bold">
                            Kite - <span className="text-sm">v1.0</span>
                        </h1>
                        <h2 className="text-3xl font-bold mb-2">
                            Todo en un solo lugar
                        </h2>
                        <h3>
                            <strong>Navegá</strong> el catalogo de{" "}
                            <strong>todos tus servicios</strong> de streaming{" "}
                            <strong>juntos</strong>.
                        </h3>
                        <Link href={route("login")}>
                            <Button className="bg-black border-2 block md:hidden w-full mt-10 border-white rounded-3xl">
                                Iniciar Sesión
                            </Button>
                        </Link>
                        <Link href={route("register")}>
                            <Button className="bg-white border-2 block w-full md:w-auto  border-black rounded-3xl text-black mt-2">
                                Crear Cuenta
                            </Button>
                        </Link>
                    </div>
                </div>
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black  opacity-90 z-0"
                    style={{ zIndex: 1 }} // Adjust the z-index to make sure the overlay is on top
                ></div>
            </div>
            <main>{children}</main>
            <FooterWithLogo mobile={true} />
        </>
    );
}
