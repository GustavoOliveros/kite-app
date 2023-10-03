import Dashboard from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

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
                <PrimaryButton className="bg-yellow-600">
                    <PencilSquareIcon className="w-5 h-5" />
                </PrimaryButton>
            );
        }

        return null;
    };

    const renderDeleteButton = () => {
        if (auth.permissions.includes('disable titles')) {
            return (
                <PrimaryButton className="bg-red-600">
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
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
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


    return (
        <>
            {console.log(filteredItems)}
            <Head title="Títulos" />
            <Dashboard title="Títulos">

                <div className="flex justify-between">
                    <PrimaryButton className="my-3">Crear Título</PrimaryButton>
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
            </Dashboard>

        </>
    );
}
