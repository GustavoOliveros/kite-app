import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import { Button, Tooltip } from "@material-tailwind/react";
import Notification from "./partials/Notification";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export default function Notifications({ reminders, auth }) {
    const [isMarkedAsRead, setIsMarkedAsRead] = useState(false);


    const markAsRead = () => {
        return axios.post(route('markAsRead')).then((response) => {
            if(response.data){
                toast.success('Marcado con éxito');
                setIsMarkedAsRead(true);
            }else{
                toast.error('Ocurrió un error');
            }
        });
    }

    return (
        <>
            <Head title="Notificaciones" />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <h1 className="text-4xl text-white mt-5 mb-10 flex items-center justify-center gap-4">
                    Notificaciones
                    <Tooltip
                        content="Marcar todo como leído"
                        placement="bottom"
                    >
                        <button onClick={markAsRead}>
                            <CheckIcon className="w-7 h-7" />
                        </button>
                    </Tooltip>
                    <button onClick={() => window.location.reload()}>
                        <ArrowPathIcon className="w-7 h-7" />
                    </button>
                </h1>

                <div className="space-y-4  text-white max-w-[50%] mx-auto">
                    {reminders &&
                        reminders.map((reminder) => (
                            <Notification key={reminder.id} reminder={reminder} isMarkedAsRead={isMarkedAsRead} />
                        ))}
                </div>
            </Authenticated>
            <Toaster />
        </>
    );
}
