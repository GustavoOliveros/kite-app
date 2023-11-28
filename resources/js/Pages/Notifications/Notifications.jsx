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
        return axios.post(route("markAsRead")).then((response) => {
            if (response.data) {
                toast.success("Marcado con éxito");
                setIsMarkedAsRead(true);
            } else {
                toast.error("Ocurrió un error");
            }
        });
    };

    return (
        <>
            <Head title="Notificaciones" />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <div className="text-4xl text-white mt-5 mb-10 md:flex items-center justify-center text-center gap-4">
                    <h1 className="">
                        Notificaciones
                    </h1>
                    <Tooltip
                        content="Marcar todo como leído"
                        placement="bottom"
                    >
                        <button onClick={markAsRead}>
                            <CheckIcon className="w-7 h-7" />
                        </button>
                    </Tooltip>
                    <button onClick={() => window.location.reload()}>
                        <ArrowPathIcon className="w-7 h-7 ms-5 md:ms-0" />
                    </button>
                </div>

                <div className="space-y-4  text-white md:max-w-[50%] px-2 md:px-0 mx-auto">
                    {reminders &&
                        reminders.map((reminder) => (
                            <Notification
                                key={reminder.id}
                                reminder={reminder}
                                isMarkedAsRead={isMarkedAsRead}
                            />
                        ))}
                </div>
            </Authenticated>
            <Toaster />
        </>
    );
}
