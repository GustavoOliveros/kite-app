import Dashboard from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState, Fragment } from "react";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from '@headlessui/react';


export default function Titles({ titles, auth }) {
    createTheme('dark', {
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
        },
        background: {
            default: '#1F2937',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');

    const renderEditButton = () => {
        if (auth.permissions.includes('edit titles')) {
            return (
                <PrimaryButton className="bg-yellow-600" onClick={openModal}>
                    <PencilSquareIcon className="w-5 h-5" />
                </PrimaryButton>
            );
        }

        return null;
    };

    const renderDeleteButton = () => {
        if (auth.permissions.includes('disable titles')) {
            return (
                <PrimaryButton className="bg-red-600" onClick={openModal}>
                    <MinusCircleIcon className="w-5 h-5" />
                </PrimaryButton>
            );
        }

        return null;
    };

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Título',
            selector: row => row.title,
        },
        {
            name: 'Estado',
            selector: row => row.disabled_at ? 'Deshabilitado' : 'Activo',
            sortable: true,
        },
        {
            name: 'Acción',
            selector: row =>
                <div className="flex gap-2">
                    {renderEditButton()}
                    {renderDeleteButton()}
                </div>,
        },
    ];

    const [filterText, setFilterText] = useState('');
    const filteredItems = titles.filter(
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()),
    );

    const change = (e) => {
        setFilterText(e.target.value);
    }

    // data provides access to your row data
    const ExpandedComponent = ({ data }) =>
        <div className="p-5 flex flex-col gap-3">
            <p>Título Original: {data.original_title}</p>
            <p>Año de lanzamiento: {data.year}</p>
            <p>Póster:&nbsp;&nbsp;
                <a
                    href={'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + data.poster_path}
                    target="_blank"
                >
                    <PrimaryButton className="bg-green-600">Ver</PrimaryButton>
                </a>
            </p>
            <p>Fondo:&nbsp;&nbsp;
                <a
                    href={'https://image.tmdb.org/t/p/w1280_and_h720_bestv2' + data.backdrop_path}
                    target="_blank"
                >
                    <PrimaryButton className="bg-green-600">Ver</PrimaryButton>
                </a>
            </p>
        </div>;

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Head title="Títulos" />
            <Dashboard title="Títulos">

                <div className="flex justify-between">
                    <PrimaryButton className="my-3" onClick={openModal}>Crear Título</PrimaryButton>
                    <div>
                        <form>
                            <TextInput
                                className="my-3 text-black"
                                id="userFilter"
                                name="userFilter"
                                placeholder="Buscar..."
                                onChange={change}
                            />
                        </form>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={filteredItems}
                    theme="dark"
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Payment successful
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Your payment has been successfully submitted. We’ve sent
                                                you an email with all of the details of your order.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Dashboard>

        </>
    );
}
