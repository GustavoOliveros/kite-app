import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { PlusIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import { useEffect } from "react";

export default function ChangesModal({
    isModalOpen,
    closeModal,
    selectedChange,
}) {
    const [data, setData] = useState([]);
    const [body, setBody] = useState([]);

    const fetchData = () => {
        return axios
            .get(route("changes.showbody", { id: selectedChange }))
            .then((response) => {
                setData(response.data);
                setBody(JSON.parse(response.data.body));
            });
    };

    useEffect(() => {
        fetchData();
    }, [selectedChange]);

    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        Cambio # {selectedChange}
                                    </Dialog.Title>

                                    <p>{data.type}</p>
                                    <p>{data.created_at}</p>

                                    <div className="h-60 w-full my-2 py-2 overflow-y-scroll">
                                        <ul>
                                            {body &&
                                                body.map((element, index) => (
                                                    <a href={route('title.show', {id: element.id})} target="_blank">
                                                        <li
                                                            key={index}
                                                            className="bg-green-200 border border-green-500 cursor-pointer hover:bg-green-300  rounded-lg py-2 mx-2 shadow"
                                                        >
                                                            {element.title}
                                                        </li>
                                                    </a>
                                                ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-2 justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-black px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
