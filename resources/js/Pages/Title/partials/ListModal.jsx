import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";
import { Spinner } from "@material-tailwind/react";

export default function ListModal({ onClose, titleId }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isInputActive, setIsInputActive] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const fetchData = () => {
        return axios
            .get(route("playlist.index", { titleId: titleId }))
            .then((response) => {
                setLoading(false);
                setData(response.data.playlists);
                setSelectedValues(response.data.selectedValues);
                console.log(response);
            })
            .catch((error) => {
                toast.error("Ocurrió un error al obtener sus listas.");
                console.error(error);
            });
    };
    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const savePlaylistSelection = (selectedValues) => {
        return axios
            .post(
                route("savePlaylistSelection", {
                    selectedValues: selectedValues,
                    titleId: titleId,
                })
            )
            .then((response) => {
                setLoading(false);
                onClose();
                callback(response);
                console.log(response);
            })
            .catch((error) => {
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.error(error);
            });
    };

    const saveNewPlaylist = (newPlaylistName) => {
        return axios
            .post(route("playlist.store", { title: newPlaylistName }))
            .then((response) => {
                setLoading(false);
                fetchData();
                setIsInputActive(false);
                callback(response);
                console.log(response);
            })
            .catch((error) => {
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.error(error);
            });
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        savePlaylistSelection(selectedValues);
    };

    const submitNewPlaylist = (e) => {
        e.preventDefault();
        setLoading(true);
        saveNewPlaylist(newPlaylistName);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (
        <div className="p-5">
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                <div className="flex justify-center mb-2 gap-2">
                    {loading ? <Spinner className="w-5 h-5 animate-spin" /> : <ListBulletIcon className="w-5 h-5" />} Listas
                </div>
                <hr />
            </Dialog.Title>

            <form onSubmit={submitNewPlaylist}>
                {isInputActive ? (
                    <TextInput
                        className="w-full mt-2"
                        isFocused={true}
                        onChange={(e) => {
                            setNewPlaylistName(e.target.value);
                        }}
                    />
                ) : (
                    <div
                        className="w-full mt-2 py-2 hover:bg-gray-300 cursor-pointer text-center"
                        onClick={() => {
                            setIsInputActive(true);
                        }}
                    >
                        Crear Lista
                    </div>
                )}
            </form>

            {/* Contenido del Modal */}
            <form onSubmit={submit} id="list-form">
                <div className="my-2 flex flex-col overflow-y-scroll h-48">
                    {data && data.length > 0 ? (
                        data.map((element, index) => (
                            <ListItem
                                key={index}
                                data={element}
                                onChange={handleCheckboxChange}
                                selectedValues={selectedValues}
                            />
                        ))
                    ) : (
                        <p className="text-black">
                            No ha creado ninguna lista...
                        </p>
                    )}
                </div>
            </form>
            <hr />
            <div className="mt-4 flex gap-3 justify-center">
                <button
                    type="submit"
                    disabled={loading}
                    form="list-form"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Guardar
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-black bg-white border-gray-800 px-4 py-2 text-sm text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
