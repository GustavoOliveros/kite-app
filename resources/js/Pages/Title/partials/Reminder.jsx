import { Button } from "@material-tailwind/react";
import { BellIcon, BellSlashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePage } from "@inertiajs/react";
import { Spinner } from "@material-tailwind/react";

export default function Reminder(){
    const { title, isReminderActive } = usePage().props;
    const [isActive, setIsActive] = useState(isReminderActive);
    const [loading, setLoading] = useState(false);
 


    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            setIsActive(!isActive);
        } else {
            toast.error(response.data.message);
            console.error(response)
        }
    };



    const createReminder = () => {
        setLoading(true);

        if (isActive) {
            return axios
                .delete(route("reminder.destroy", { id: title.id }))
                .then((response) => {
                    setLoading(false);
                    callback(response);
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error(
                        "Ocurrió un error. Inténtelo de nuevo más tarde."
                    );
                    console.log(error);
                });
        }

        return axios
            .get(route("reminder.store", { id: title.id }))
            .then((response) => {
                setLoading(false);
                callback(response);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    }

    return (
        <Button
                className="bg-transparent border border-white text-white flex justify-center md:p-5 rounded-full" aria-label="Crear recordatorio"
                onClick={createReminder}
            >
                {loading ? (
                    <Spinner className="h-4 w-4" />
                ) : isActive ? (
                    <BellIcon className="h-4 w-4 scale-150" />
                ) : (
                    <BellSlashIcon className="h-4 w-4 scale-150" />
                )}
        </Button>
    );
}