import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { PencilSquareIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

export default function Users(users) {
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
        if (users.auth.permissions.includes('edit users')) {
            return (
                <PrimaryButton className="bg-yellow-600">
                    <PencilSquareIcon className="w-5 h-5" />
                </PrimaryButton>
            );
        }

        return null;
    };

    const renderDeleteButton = () => {
        if (users.auth.permissions.includes('disable users')) {
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
            name: 'Usuario',
            selector: row => row.username,
        },
        {
            name: 'Correo',
            selector: row => row.email,
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
    const filteredItems = users.users.filter(
        item => item.username && item.username.toLowerCase().includes(filterText.toLowerCase()),
    );

    const change = (e) => {
        setFilterText(e.target.value);
    }


    return (
        <>
            {console.log(users.auth.permissions)}
            <Head title="Usuarios" />
            <Dashboard title="Usuarios">

                <div className="md:flex md:justify-between">
                    <PrimaryButton className="md:my-3">Crear Usuario</PrimaryButton>
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
                />
            </Dashboard>

        </>
    );
};