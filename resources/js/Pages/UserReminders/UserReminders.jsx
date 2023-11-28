import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeletableTitleList from "@/Components/DeletableTitleList";
import { Tooltip } from "@material-tailwind/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { TrashIcon as TrashIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";

export default function UserReminders({ auth, titles }) {
    const [isDeletable, setIsDeletable] = useState(false);
    const [data, setData] = useState(titles);

    const fetchData = () => {
        return axios
            .get(route("reminder.all"))
            .then((response) => setData(response.data));
    };

    const clickHandler = () => {
        setIsDeletable(!isDeletable);
    };

    return (
        <>
            <Head title="Recordatorios" />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <div className="md:flex items-center gap-3  text-center">
                    <h1 className="text-4xl text-white my-5">Recordatorios</h1>
                    <Tooltip
                        content={
                            <p className="md:w-80">
                                Recibirá notificaciones si cualquiera de estos
                                títulos son agregados a sus servicios o si se
                                estrenan. Para eliminar alguno, haga clic en el
                                ícono{" "}
                                <TrashIcon className="w-4 h-4 inline-flex text-white" />{" "}
                                para activar el modo edición.
                            </p>
                        }
                        placement="bottom"
                    >
                        <QuestionMarkCircleIcon className="w-10 h-10 text-white hover:text-gray-300 inline-flex" />
                    </Tooltip>
                    {!isDeletable ? (
                        <button onClick={clickHandler}>
                            <TrashIconOutline
                                className="w-10 h-10 text-white cursor-pointer hover:text-gray-300 inline-flex ms-5 md:ms-0"
                                aria-label="Activar modo de edición"
                            />
                        </button>
                    ) : (
                        <button onClick={clickHandler}>
                            <TrashIcon
                                className="w-10 h-10 text-white cursor-pointer hover:text-gray-300 inline-flex ms-5 md:ms-0"
                                aria-label="Desactivar modo de edición"
                            />
                        </button>
                    )}
                    {isDeletable ? (
                        <p className="text-white">Modo de edición activo</p>
                    ) : (
                        ""
                    )}
                </div>
                <DeletableTitleList
                    data={data}
                    isDeletable={isDeletable}
                    fetchData={fetchData}
                />
            </Authenticated>
            <Toaster />
        </>
    );
}
