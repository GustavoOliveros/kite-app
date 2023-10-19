import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import TextInput from "@/Components/TextInput";

export default function ListModal({isModalOpen, closeModal, titleId}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [isInputActive, setIsInputActive] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const fetchData = () => {
        return axios
            .get(route("playlist.index", {titleId : titleId}))
            .then((response) => {
                setLoading(false);
                setData(response.data.playlists);
                setSelectedValues(response.data.selectedValues);
                console.log(response)
                
            })
            .catch((error) => {
                toast.error('Ocurrió un error al obtener sus listas.');
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
            .post(route('savePlaylistSelection', {selectedValues: selectedValues, titleId: titleId}))
            .then((response) => {
                setLoading(false);
                closeModal();
                callback(response);
                console.log(response)
            })
            .catch((error) => {
                toast.error('Ocurrió un error. Inténtelo de nuevo más tarde.')
                console.error(error);
            });

    };

    const saveNewPlaylist = (newPlaylistName) => {
        return axios
            .post(route('playlist.store', {title: newPlaylistName}))
            .then((response) => {
                setLoading(false);
                fetchData();
                setIsInputActive(false);
                callback(response);
                console.log(response)
            })
            .catch((error) => {
                toast.error('Ocurrió un error. Inténtelo de nuevo más tarde.')
                console.error(error);
            });
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        savePlaylistSelection(selectedValues);
    };

    const submitNewPlaylist = (e) => {
        e.preventDefault();
        setLoading(true);
        saveNewPlaylist(newPlaylistName);
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (
        <>
        {console.log(selectedValues)}
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed bg-black bg-opacity-25 inset-0" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className="flex justify-center mb-2 gap-2">
                                            <ListBulletIcon className="w-5 h-5" /> Listas
                                        </div>
                                        <hr />
                                    </Dialog.Title>

                                    <form onSubmit={submitNewPlaylist}>
                                        {isInputActive ?
                                        <TextInput className="w-full mt-2" isFocused={true} onChange={(e) => {setNewPlaylistName(e.target.value)}} />
                                        :
                                        <div className="w-full mt-2 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => {setIsInputActive(true)}}>
                                            Crear Lista
                                        </div>}
                                    </form>

                                    {/* Contenido del Modal */}
                                    <form onSubmit={submit} id="list-form">
                                        <div className="my-2 flex flex-col overflow-y-scroll h-48">
                                            {data && data.length > 0 ? (
                                                data.map((element, index) => 
                                                    <ListItem
                                                        key={index}
                                                        data={element} 
                                                        onChange={handleCheckboxChange}
                                                        selectedValues={selectedValues}
                                                    />
                                                )
                                            ) : (
                                                <p className="text-black">No ha creado ninguna lista...</p>
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
                                            onClick={closeModal}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-black bg-white border-gray-800 px-4 py-2 text-sm text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
