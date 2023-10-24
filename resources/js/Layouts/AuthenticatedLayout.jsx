import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { FooterWithLogo } from './partials/Footer';
import { useEffect, useState } from 'react';
import { HomeIcon, UserCircleIcon, MagnifyingGlassIcon, Squares2X2Icon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';

export default function Authenticated({ user, children, permissions, backgroundImagePath = "" }) {
    const divStyle = {
        backgroundImage:
            `${backgroundImagePath === "" ? "" : "url(https://image.tmdb.org/t/p/w1280_and_h720_bestv2"+backgroundImagePath+")" }`
    }

    const [navColor, setnavColor] = useState("transparent");

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#18181B") : setnavColor("transparent");
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
            className=
            {`min-h-screen ${backgroundImagePath === "" ?
                'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-cover'}`}
            style={ divStyle }
        >
            <div className={`flex flex-col ${backgroundImagePath === "" ? '' : 'bg-zinc-900/95 backdrop-blur-2xl md:backdrop-blur-none'}`}>
                <nav
                className="p-1 md:p-0 md:sticky md:top-0 z-20"
                style=
                {{
                    backgroundColor: navColor,
                    transition: "all 0.5s"
                }}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-center md:justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                    <NavLink href={route('home')} active={route().current('home')} className='text-white flex align-center justify-center'>
                                        <HomeIcon className="w-4 h-4 me-3" />
                                        Home
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                    <NavLink href={route('search')} active={route().current('search')} className='text-white flex align-center justify-center'>
                                        <MagnifyingGlassIcon className="w-4 h-4 me-3" />
                                        Búsqueda
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                    <NavLink href={route('library')} active={route().current('library')} className='text-white flex align-center justify-center'>
                                        <Squares2X2Icon className="w-4 h-4 me-3" />
                                        Biblioteca
                                    </NavLink>
                                </div>
                            </div>

                            <div className="hidden md:flex md:items-center md:ml-6">
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
                                            {permissions.includes('access dashboard') ?
                                                <><Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link><hr /></> : ''}
                                            <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                            <Dropdown.Link href={route('history')}>Historial</Dropdown.Link>
                                            <hr />
                                            <Dropdown.Link href={route('logout')} method="post" as="button" className='text-red-600'>
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
                    <div className='max-w-7xl grow mx-auto'>
                        {children}
                    </div>
                </main>

                
                </div>
 
        </div>
        <nav className="md:hidden bg-gray-900 text-gray-400 fixed bottom-0 w-full">
            <div className="flex justify-between gap-5 py-3 px-8">
                <Link href={route('home')}>
                    <HomeIcon className={`w-8 h-8 ${route().current('home') ? 'text-white' : ''}`} />
                </Link>
                <Link href={route('search')}>
                    <MagnifyingGlassIcon className={`w-8 h-8 ${route().current('search') ? 'text-white' : ''}`} />
                </Link>
                {permissions.includes('access dashboard') ?
                    <Link href={route('dashboard')}><AdjustmentsVerticalIcon className={`w-8 h-8 ${route().current('dashboard') ? 'text-white' : ''}`} /></Link>
                    : <Link href={route('library')}><Squares2X2Icon className={`w-8 h-8 ${route().current('library') ? 'text-white' : ''}`} /></Link>}
                <Link href={route('search')}>
                    <UserCircleIcon className={`w-8 h-8 ${route().current('profile') ? 'text-white' : ''}`} />
                </Link>
            </div>
        </nav>
        <FooterWithLogo />
        </>
        
    );
}
