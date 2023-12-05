import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { FooterWithLogo } from "./partials/Footer";
import { useEffect, useState } from "react";
import {
    HomeIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    Squares2X2Icon,
    AdjustmentsVerticalIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as HomeIconOutline,
    MagnifyingGlassIcon as MagnifyingGlassIconOutline,
    PlusIcon as PlusIconOutline,
    UserCircleIcon as UserCircleIconOutline,
    Squares2X2Icon as Squares2X2IconOutline,
    AdjustmentsVerticalIcon as AdjustmentsVerticalIconOutline,
} from "@heroicons/react/24/outline";
import NotificationLayout from "./partials/NotificationLayout";

export default function Authenticated({
    user,
    children,
    permissions,
    backgroundImagePath = "",
}) {
    const divStyle = {
        backgroundImage: `${
            backgroundImagePath === ""
                ? ""
                : "url(https://image.tmdb.org/t/p/w1280_and_h720_bestv2" +
                  backgroundImagePath +
                  ")"
        }`,
    };

    const [isOnTop, setIsOnTop] = useState(true);
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setIsOnTop(false) : setIsOnTop(true);
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
                className={`min-h-screen ${
                    backgroundImagePath === ""
                        ? "bg-gradient-to-b from-gray-800 to-gray-900"
                        : "bg-no-repeat bg-cover bg-fixed"
                }`}
                style={divStyle}
            >
                <div
                    className={`flex flex-col ${
                        backgroundImagePath === ""
                            ? ""
                            : "bg-zinc-900/95 backdrop-blur-2xl md:backdrop-blur-none"
                    }`}
                >
                    <nav
                        className={`p-1 md:p-0 md:sticky md:top-0 z-20 transition-all duration-500 ${
                            isOnTop
                                ? "bg-transparent"
                                : "bg-zinc-900/90 backdrop-blur-2xl"
                        }`}
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-center md:justify-between h-16">
                                <div className="md:flex grid grid-cols-3 items-center justify-center w-full md:w-auto md:justify-normal ">
                                    <div className="md:hidden"></div>

                                    <div className="shrink-0 flex items-center justify-center">
                                        <Link href="/">
                                            <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                                        </Link>
                                    </div>

                                    <NotificationLayout className="md:hidden flex justify-center" />

                                    <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                        <NavLink
                                            href={route("home")}
                                            active={route().current("home")}
                                            className="text-white flex align-center justify-center"
                                        >
                                            <HomeIcon className="w-4 h-4 me-3" />
                                            Home
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                        <NavLink
                                            href={route("search")}
                                            active={route().current("search")}
                                            className="text-white flex align-center justify-center"
                                        >
                                            <MagnifyingGlassIcon className="w-4 h-4 me-3" />
                                            Búsqueda
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                        <NavLink
                                            href={route("library")}
                                            active={route().current("library")}
                                            className="text-white flex align-center justify-center"
                                        >
                                            <Squares2X2Icon className="w-4 h-4 me-3" />
                                            Biblioteca
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                        <NavLink
                                            href={route("showAddTitle")}
                                            active={route().current(
                                                "showAddTitle"
                                            )}
                                            className="text-white flex align-center justify-center"
                                        >
                                            <PlusIcon className="w-4 h-4 me-3" />
                                            Agregar título
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="hidden md:flex md:items-center md:ml-6">
                                    <NotificationLayout />
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {user.username}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                {permissions.includes(
                                                    "access dashboard"
                                                ) ? (
                                                    <>
                                                        <Dropdown.Link
                                                            href={route(
                                                                "dashboard"
                                                            )}
                                                        >
                                                            Dashboard
                                                        </Dropdown.Link>
                                                        <hr />
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Perfil
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("history")}
                                                >
                                                    Historial
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("showSuggestions")}
                                                >
                                                    Sugerencias
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("userReviews")}
                                                >
                                                    Reseñas
                                                </Dropdown.Link>
                                               
                                                <hr />
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className="text-red-600"
                                                >
                                                    Cerrar sesión
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <main className="flex pb-20 md:pb-0">
                        <div className="max-w-7xl grow mx-auto">{children}</div>
                    </main>
                </div>
            </div>
            <nav className="md:hidden bg-gray-900 text-gray-400 fixed bottom-0 w-full">
                <div className="flex justify-between gap-5 py-3 px-8">
                    <Link href={route("home")} title="Inicio (Home)">
                        {route().current("home") ? (
                            <HomeIcon className="w-7 h-7 text-white" />
                        ) : (
                            <HomeIconOutline className="w-7 h-7" />
                        )}
                    </Link>
                    <Link href={route("search")} title="Búsqueda">
                        {route().current("search") ? (
                            <MagnifyingGlassIcon className="w-7 h-7 text-white" />
                        ) : (
                            <MagnifyingGlassIconOutline className="w-7 h-7" />
                        )}
                    </Link>
                    <Link href={route("showAddTitle")} title="Agregar título">
                        {route().current("showAddTitle") ? (
                            <PlusIcon className="w-7 h-7 text-white" />
                        ) : (
                            <PlusIconOutline className="w-7 h-7" />
                        )}
                    </Link>
                    {permissions.includes("access dashboard") ? (
                        <Link href={route("dashboard")} title="Dashboard">
                            {route().current("dashboard") ? (
                                <AdjustmentsVerticalIcon className="w-7 h-7 text-white" />
                            ) : (
                                <AdjustmentsVerticalIconOutline className="w-7 h-7" />
                            )}
                        </Link>
                    ) : (
                        <Link href={route("library")} title="Biblioteca">
                            {route().current("library") ? (
                                <Squares2X2Icon className="w-7 h-7 text-white" />
                            ) : (
                                <Squares2X2IconOutline className="w-7 h-7" />
                            )}
                        </Link>
                    )}
                    <Link href={route("profile.edit")} title="Perfil">
                        {route().current("profile.edit") ? (
                            <UserCircleIcon className="w-7 h-7 text-white" />
                        ) : (
                            <UserCircleIconOutline className="w-7 h-7" />
                        )}
                    </Link>
                </div>
            </nav>
            <FooterWithLogo />
        </>
    );
}
