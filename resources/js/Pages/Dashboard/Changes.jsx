import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import { createTheme } from "react-data-table-component";
import { Button } from "@material-tailwind/react";
import { ArrowDownTrayIcon, ArrowPathIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import ChangesModal from "./partials/ChangesModal";

export default function Changes({ changes, auth }) {
    const [processing, setProcessing] = useState(false);
    const [changesAux, setChangesAux] = useState(changes);
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [selectedChange, setSelectedChange] = useState(0);

    function openModal(changeId) {
        setIsModelOpen(true)
        setSelectedChange(changeId);
    }

    function closeModal() {
        setIsModelOpen(false)
    }

    createTheme(
        "dark",
        {
            text: {
                primary: "#FFFFFF",
                secondary: "#FFFFFF",
            },
            background: {
                default: "#1F2937",
            },
            context: {
                background: "#cb4b16",
                text: "#FFFFFF",
            },
            divider: {
                default: "#073642",
            },
        },
        "dark"
    );

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Tipo",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Fecha",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            name: "Cuerpo",
            selector: (row) =>
            <EyeIcon className="w-5 h-5 cursor-pointer" onClick={(e) => {openModal(row.id)}}/>,
        },
    ];

    const fetchData = () => {
        setProcessing(true);
        return axios.get(route('changes.index')).then((response) => {setProcessing(false);setChangesAux(response.data)})
    }

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };


    const performChanges = () => {
        const toastLoading = toast.loading('Procesando...');

        return axios
            .get(route('performChanges'))
            .then((response) => {
                toast.dismiss(toastLoading);
                callback(response);
                fetchData();
                console.log(response.data);
            })
            .catch((error) => {
                toast.dismiss(toastLoading);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    }

    return (
        <>
            <Head title="Cambios" />
            <Dashboard title="Cambios">
                <div className="md:flex md:justify-start md:gap-2">
                    {auth.permissions.includes("perform changes") ? (
                        <Button
                            onClick={performChanges}
                            className="bg-gray-800 mt-2 md:my-3  flex gap-2 justify-center items-center"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5" />
                            Hacer Cambios
                        </Button>
                    ) : null}
                    <Button onClick={fetchData} className="bg-gray-800 mt-2 md:my-3  flex justify-center"><ArrowPathIcon className="w-5 h-5" /></Button>
                </div>

                <DataTable
                    columns={columns}
                    data={changesAux}
                    noDataComponent={<p className="my-5">No hay cambios para mostrar...</p>}
                    theme="dark"
                    pagination
                    progressPending={processing}
                    progressComponent={<h2 className="text-xl my-5">Cargando...</h2>}
                />
            </Dashboard>
            <Toaster />

            <ChangesModal isModalOpen={isModalOpen} closeModal={closeModal} selectedChange={selectedChange} />
        </>
    );
}
