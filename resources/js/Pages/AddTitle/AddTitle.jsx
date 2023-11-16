import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import axios from "axios";
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { PlusIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AddTitle({ auth }) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        return axios
            .post(route("storeUser", selectedValue))
            .then((response) => {
                setLoading(false);
                setSelectedValue([]);
                callback(response);
                console.log(response);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 422) {
                    toast.error(
                        "Ocurrió un error o estás intentando registrar un título preexistente."
                    );
                } else {
                    toast.error(
                        "Ocurrió un error. Inténtelo de nuevo más tarde."
                    );
                }
                console.log(error);
            });
    };

    const fetchData = (e) => {
        e.preventDefault();
        setLoading(true);

        return axios
            .get(route("getTitlesFromAPI", { query: query }))
            .then((response) => {
                setLoading(false);

                if (response.data.type === "error") {
                    toast.error(response.data.message);
                } else {
                    setData(response.data.results);
                }

                console.log(response);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.error(error);
            });
    };

    return (
        <>
            <Head title="Añadir Título" />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
            >
                <h1 className="text-white text-4xl my-5">Agregar título</h1>
                <p className="text-white mb-5">En este apartado podrás buscar un título en la base de datos de The Movie Database para ser agregado a Kite.<br />
                    Agradecemos mucho su apoyo en el crecimiento de la aplicación.</p>
                <div>
                    <InputLabel htmlFor="query" className="!text-lg font-light text-white" >
                        {loading ? (
                            <Spinner className="animate-spin w-5 h-5 inline" />
                        ) : (
                            <PlusIcon className="w-5 h-5 inline " />
                        )}{" "}
                        Buscar título en TheMovieDatabase
                    </InputLabel>
                </div>
                <div className="my-2">
                    <form onSubmit={fetchData}>
                        <TextInput
                            className="w-full"
                            name="query"
                            id="query"
                            placeholder="Palabra clave..."
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>
                </div>
                <div>
                    <h2 className="text-white font-bold">Su elección</h2>
                    <ul>
                        <li
                            className={
                                selectedValue.id ? "text-white flex gap-2" : "text-transparent flex gap-2"
                            }
                        >
                            {selectedValue.title
                                ? selectedValue.title
                                : selectedValue.name}{" "}
                            (
                            {selectedValue.release_date
                                ? selectedValue.release_date.substring(0, 4)
                                : null}
                            {selectedValue.first_air_date
                                ? selectedValue.first_air_date.substring(0, 4)
                                : null}
                            )
                            <a href={`https://www.themoviedb.org/${selectedValue.media_type}/${selectedValue.id}`} target="_blank"><ArrowTopRightOnSquareIcon className="w-5 h-5 cursor-pointer" /></a>
                        </li>
                    </ul>
                </div>
                <div className="bg-zinc-900 h-60 my-5 overflow-y-scroll rounded-lg">
                    <form onSubmit={submitHandler} id="store-form">
                        {data &&
                            data.length > 0 &&
                            data.map((element, index) =>
                                element.media_type != "person" ? (
                                    <div
                                        key={index}
                                        className="py-2 text-white cursor-pointer hover:bg-zinc-800 p-5"
                                        onClick={(e) =>
                                            setSelectedValue(element)
                                        }
                                    >
                                        {element.title
                                            ? element.title
                                            : element.name}{" "}
                                        (
                                        {element.release_date
                                            ? element.release_date.substring(
                                                  0,
                                                  4
                                              )
                                            : null}
                                        {element.first_air_date
                                            ? element.first_air_date.substring(
                                                  0,
                                                  4
                                              )
                                            : null}
                                        )
                                    </div>
                                ) : null
                            )}
                    </form>
                </div>

                <div className="flex gap-2 justify-center">

                    <button
                        type="submit"
                        form="store-form"
                        className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        Guardar
                    </button>
                </div>
            </AuthenticatedLayout>

            <Toaster />
        </>
    );
}
