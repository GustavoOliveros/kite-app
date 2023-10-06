import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { FooterWithLogo } from './partials/Footer';
import { HomeIcon, UserCircleIcon, MagnifyingGlassIcon, Squares2X2Icon, AdjustmentsVerticalIcon } from '@heroicons/react/24/solid';

export default function Authenticated({ user, header, children, permissions }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col">
            <nav className="p-1 md:p-0 md:sticky md:top-0 md:bg-zinc-800/90 backdrop-blur z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center md:justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('home')} active={route().current('home')} className='text-white flex align-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 me-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    Home
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('search')} active={route().current('search')} className='text-white flex align-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 me-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                    Búsqueda
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
                                            <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link> : ''}
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
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
                        : <Link href={route('search')}><Squares2X2Icon className={`w-8 h-8 ${route().current('library') ? 'text-white' : ''}`} /></Link>}
                    <Link href={route('search')}>
                        <UserCircleIcon className={`w-8 h-8 ${route().current('profile') ? 'text-white' : ''}`} />
                    </Link>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-grow">{children}</main>
            
            <FooterWithLogo />
        </div>
    );
}
