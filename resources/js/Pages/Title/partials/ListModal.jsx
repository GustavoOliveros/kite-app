import TextInput from "@/Components/TextInput";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import { useForm } from "@inertiajs/react";
import { ListBulletIcon } from "@heroicons/react/24/solid";

export default function ListModal({isModalOpen, closeModal, titleId}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const { data: formData, setData: setFormData, post } = useForm({
        playlists: [],
    });

    const fetchData = () => {
        return axios
            .get(route("playlist.index", {titleId : titleId}))
            .then((response) => {
                setLoading(false);
                setData(response.data);
                console.log(response)
                // setSelectedValues(response.data.selectedValues)
                
            })
            .catch((error) => {
                // mostrarmensajeerror
                console.error(error);
            });
    };
    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }

        setFormData('playlists', [...selectedValues, value]);
    };
    const submit = (e) => {
        e.preventDefault();

        post(route('savePlaylistSelection'));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                        <div className="flex justify-center gap-2">
                                            <ListBulletIcon className="w-5 h-5" /> Listas
                                        </div>
                                        <hr />
                                    </Dialog.Title>

                                    {/* Contenido del Modal */}
                                    <form onSubmit={submit}>
                                        <div className="mt-2 flex flex-col">
                                            {data && data.length > 0 ? (
                                                data.map((element, index) => 
                                                    <ListItem
                                                        key={index}
                                                        data={element.playlist} 
                                                        onChange={handleCheckboxChange}
                                                        selectedValues={selectedValues}
                                                    />
                                                )
                                            ) : (
                                                <p className="text-white">No ha creado ninguna lista...</p>
                                            )}
                                        </div>
                                    </form>

                                    <div className="mt-4 flex gap-3 justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-white border-gray-800 px-4 py-2 text-sm text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
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
