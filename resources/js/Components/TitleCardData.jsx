import { ListBulletIcon, TrashIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function TitleCardData({
    data,
    className,
    loadHandler,
    isLoading,
    isDeletable,
    fetchData
}) {

    const { deleteRoute } = usePage().props;

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            fetchData();
        } else {
            toast.error(response.data.message);
            console.error(response)
        }
    };

    const deleteReminder = () => {
        const loading = toast.loading('Procesando...');

        return axios
            .delete(route(deleteRoute, { id: data.id }))
            .then((response) => {
                toast.dismiss(loading);
                callback(response);
            })
            .catch((error) => {
                toast.dismiss(loading);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    };



    return (
        
        <div className={`relative flex justify-center items-center border-2 border-transparent rounded-lg ${!isDeletable ? 'hover:border-white cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300' : ''}`}>
            <img
                className={" rounded-lg " + className}
                src={
                    data.poster_path
                        ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                          data.poster_path
                        : "/img/zinc900-900x600.png"
                }
                alt={data.title + " "}
                style={{ display: isLoading ? "none" : "block" }}
                onLoad={loadHandler}
            />
            <img
                className={" rounded-lg animate-pulse" + className}
                style={{ display: isLoading ? "block" : "none" }}
                src="/img/zinc900-900x600.png"
                alt={data.title + " "}
            />
            <h1
                className={`${
                    data.poster_path ? "hidden" : ""
                } absolute p-2 text-white text-2xl`}
            >
                {data.title}
            </h1>
            <ListBulletIcon
                className={`${
                    data.poster_path ? "hidden" : ""
                } w-5 h-5 absolute top-4 text-white left-4 `}
            />

            {isDeletable ? (
                <div onClick={deleteReminder} className="rounded-full absolute cursor-pointer top-4 right-4 border-transparent border-2 text-red-600 p-2 bg-white hover:border-skyblue transition hover:scale-125 duration-300">
                    <TrashIcon className="w-5 h-5" />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
