import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { PencilSquareIcon, MinusCircleIcon, PlusIcon, ArrowPathIcon, CheckIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import CreateTitleModal from "./partials/CreateTitleModal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


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
                <span className="flex items-center justify-center cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5 text-white" />
                </span>
            );
        }

        return null;
    };

    const renderDeleteButton = () => {
        if (auth.permissions.includes('disable titles')) {
            return (
                <span className="flex items-center justify-center cursor-pointer">
                    <MinusCircleIcon className="w-5 h-5 text-white" />
                </span>
            );
        }

        return null;
    };

    const renderAcceptDenyButtons = (id) => {
        if(auth.permissions.includes('edit titles')){
            return (
                <>
                    <span className="flex items-center justify-center cursor-pointer" onClick={() => accept(id)} >
                        <CheckIcon className="w-5 h-5 text-white" />
                    </span>
                    
                </>
            );
        }
    }

    const columns = [
        {
            name: 'Id',
            selector: row => <a href={route('title.show', {id:row.id})} target="_blank" className="underline">{row.id}</a>,
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
            selector: row => row.status ? 'Activo' : 'Deshabilitado',
            sortable: true,
        },
        {
            name: 'Acción',
            selector: row =>
                <div className="flex gap-3">
                    {!row.status ? renderAcceptDenyButtons(row.id) : ''}
                    {renderEditButton()}
                    {row.status ? renderDeleteButton() : ''}
                </div>,
                
        },
    ];

    const [titlesAux, setTitlesAux] = useState(titles);
    const [filterText, setFilterText] = useState('');
    const [processing, setProcessing] = useState(false);
    const filteredItems = titlesAux.filter(
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
                    <Button className="bg-white text-black">Ver</Button>
                </a>
            </p>
            <p>Fondo:&nbsp;&nbsp;
                <a
                    href={'https://image.tmdb.org/t/p/w1280_and_h720_bestv2' + data.backdrop_path}
                    target="_blank"
                >
                    <Button className="bg-white text-black">Ver</Button>
                </a>
            </p>
        </div>;


    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };


    const fetchData = () => {
        setProcessing(true);
        return axios.get(route('getAllLocalTitles')).then((response) => {setProcessing(false);setTitlesAux(response.data)})
    }

    const accept = (id) => {
        const toastLoading = toast.loading('Procesando...');

        return axios
            .get(route("acceptTitle", {id:id}))
            .then((response) => {
                toast.dismiss(toastLoading);
                callback(response);
                fetchData();
                console.log(response);
            })
            .catch((error) => {
                toast.dismiss(toastLoading);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    }

    return (
        <>
            <Head title="Títulos" />
            <Dashboard title="Títulos">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="flex justify-between gap-2">
                    {auth.permissions.includes("add titles") ? (
                        <Button
                            className="mt-2 md:my-3 bg-gray-800 w-full md:w-auto"
                            onClick={openModal}
                        >
                            <PlusIcon className="w-5 h-5 pe-2 inline" />
                            Crear Título
                        </Button>
                    ) : null}
                    <Button onClick={fetchData} className="bg-gray-800 mt-2 md:my-3  flex justify-center"><ArrowPathIcon className="w-5 h-5" /></Button>
                    </div>
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
                    progressPending={processing}
                    progressComponent={<h2 className="text-xl my-5">Cargando...</h2>}
                />
            </Dashboard>

            <CreateTitleModal isModalOpen={isOpen} closeModal={closeModal} updateTable={fetchData} callback={callback} />
            <Toaster />
        </>
    );
}
