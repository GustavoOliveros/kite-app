import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import LinkButton from "@/Components/LinkButton";
import Landing from "@/Layouts/LandingLayout";
import { Square2StackIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { useIsVisible } from "@/Hooks/useIsVisible";
import { useRef } from "react";

export default function LandingPage({ services }) {
    const ref1 = useRef();
    const ref2 = useRef();
    const isVisible1 = useIsVisible(ref1);
    const isVisible2 = useIsVisible(ref2);

    return (
        <>
            <Head title="Todo en un solo lugar" />
            <Landing>
                {/* Features */}
                <div className="w-full  bg-zinc-900  text-white flex justify-center">
                    <div className="flex items-center justify-evenly max-w-7xl gap-3 my-10">
                        <div className="bg-zinc-700 rounded-lg p-10">
                            <Square2StackIcon className="w-10 h-10" />
                            <h2 className="text-xl font-bold">COMBINADO</h2>
                            <p>
                                Navega los catalogos de todos tus servicios de
                                streaming en un solo lugar.
                            </p>
                        </div>
                        <div className="bg-zinc-700 rounded-lg p-10">
                            <Square2StackIcon className="w-10 h-10" />

                            <h2 className="text-xl font-bold">COMBINADO</h2>
                            <p>
                                Navega los catalogos de todos tus servicios de
                                streaming en un solo lugar.
                            </p>
                        </div>
                        <div className="bg-zinc-700 rounded-lg p-10">
                            <Square2StackIcon className="w-10 h-10" />

                            <h2 className="text-xl font-bold">COMBINADO</h2>
                            <p>
                                Navega los catalogos de todos tus servicios de
                                streaming en un solo lugar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="w-full  bg-gray-800  text-white flex justify-center">
                    <div ref={ref1} className={`flex items-center flex-col w-full max-w-7xl gap-3 my-10 transition-opacity ease-in duration-1000 ${isVisible1 ? "opacity-100" : "opacity-0"}`}>
                        <div className="p-10 w-full text-center">
                            <h2 className="text-3xl font-bold mb-3">
                                Tus servicios favoritos
                            </h2>
                            <p>
                                Kite soporta los principales servicios de
                                streaming en Argentina.
                            </p>
                        </div>
                        <div className="p-10 w-full flex justify-evenly">
                            {console.log(services)}
                            {services &&
                                services.map((element, index) => (
                                    <img
                                        src={element.logo_path}
                                        alt={element.name}
                                        className="fill-white"
                                    />
                                ))}
                        </div>
                    </div>
                </div>

                {/* Features Part 2 (advanced) */}
                {/* <div className="w-full  bg-zinc-900 text-white flex justify-center">
                    <div className="flex items-center flex-col w-full max-w-7xl gap-3 my-10">
                        <div className="p-10 w-full text-center">
                            <h2 className="text-3xl font-bold mb-3">
                                Tus servicios favoritos
                            </h2>
                            <p>
                                Kite soporta los principales servicios de
                                streaming en Argentina.
                            </p>
                        </div>
                        <div className="p-10 w-full flex justify-evenly">
                            {console.log(services)}
                            {services &&
                                services.map((element, index) => (
                                    <img
                                        src={element.logo_path}
                                        alt=""
                                        className=""
                                    />
                                ))}
                        </div>
                    </div>
                </div> */}

                {/* What are you waiting for? */}
                <div
                    className="w-full  bg-zinc-900  text-white  bg-cover bg-fixed"
                    style={{
                        backgroundImage:
                            'url("https://imageio.forbes.com/specials-images/imageserve/62f65f10bf88451e43750f03/Streaming/0x0.jpg?crop=2745,1544,x0,y136,safe&height=399&width=711&fit=bounds")',
                    }}
                >
                    <div className="bg-black/90 w-full flex justify-center">
                        <div ref={ref2} className={`flex justify-center flex-col max-w-7xl gap-3 my-10 transition-opacity ease-in duration-1000 ${isVisible2 ? "opacity-100" : "opacity-0"}`}>
                            <h2 className="text-4xl font-bold text-center">
                                ¿Qué esperas?
                            </h2>
                            <Link href={route("register")} className="text-center">
                                <Button className="bg-white border-2 border-black rounded-3xl text-black mt-2">
                                    Crear Cuenta
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Landing>

            {/* <div className="bg-zinc-900 min-h-screen flex flex-col items-center justify-center">
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
            </div> */}
        </>
    );
}
