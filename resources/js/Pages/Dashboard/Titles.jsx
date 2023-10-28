import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import CreateTitleModal from "./partials/CreateTitleModal";


export default function Titles({ titles, auth }) {
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

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
                <span className="flex items-center justify-center cursor-pointer" onClick={openModal}>
                    <PencilSquareIcon className="w-5 h-5 text-yellow-600" />
                </span>
            );
        }

        return null;
    };

    const renderDeleteButton = () => {
        if (auth.permissions.includes('disable titles')) {
            return (
                <span className="flex items-center justify-center cursor-pointer" onClick={openModal}>
                    <MinusCircleIcon className="w-5 h-5 text-red-600" />
                </span>
            );
        }

        return null;
    };

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            grow: true,
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
            grow: true,
        },
        {
            name: 'Título',
            selector: row => row.title,

        },
        {
            name: 'Estado',
            selector: row => row.disabled_at ? 'Deshabilitado' : 'Activo',
            sortable: true,
            grow: true,
        },
        {
            name: 'Acción',
            selector: row =>
                <div className="grid grid-cols-2 gap-3">
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
                    <Button className="bg-green-600">Ver</Button>
                </a>
            </p>
            <p>Fondo:&nbsp;&nbsp;
                <a
                    href={'https://image.tmdb.org/t/p/w1280_and_h720_bestv2' + data.backdrop_path}
                    target="_blank"
                >
                    <Button className="bg-green-600">Ver</Button>
                </a>
            </p>
        </div>;



    return (
        <>
            <Head title="Títulos" />
            <Dashboard title="Títulos">

                <div className="md:flex justify-between">
                    <Button className="mt-2 md:my-3 bg-gray-800  w-full md:w-auto" onClick={openModal}>Crear Título</Button>
                    <div>
                        <form>
                            <TextInput
                                className="my-2 md:my-3 text-black  w-full md:w-auto"
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

            </Dashboard>

            {console.log(isOpen)}
            <CreateTitleModal isModalOpen={isOpen} closeModal={closeModal} />

        </>
    );
}
