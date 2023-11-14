import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useState, Fragment } from "react";
import { NewspaperIcon } from "@heroicons/react/24/solid";
import { Spinner, Chip } from "@material-tailwind/react";
import { useEffect } from "react";

export default function ChangesModal({
    isModalOpen,
    closeModal,
    selectedChange,
}) {
    const [data, setData] = useState([]);
    const [body, setBody] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        return axios
            .get(route("changes.showbody", { id: selectedChange }))
            .then((response) => {
                setLoading(false);
                setData(response.data);
                if(response.data.type === 'success'){
                    setBody(JSON.parse(response.data.body));
                }else{
                    setBody(response.data.body);
                }
            });
    };

    useEffect(() => {
        setLoading(true);
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
                                        className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Spinner className="animate-spin w-5 h-5" /> : <NewspaperIcon className="w-5 h-5" />}
                                        Cambio #{selectedChange}
                                        
                                    </Dialog.Title>

                                    <p>
                                        {!loading && (data.type === "success" ? (
                                            <Chip
                                                value="success"
                                                className="bg-green-500 text-black my-2"
                                            />
                                        ) : (
                                            <Chip
                                                value="error"
                                                className="bg-red-500 text-white my-2"
                                            />
                                        ))}
                                    </p>
                                    <p>{!loading && data.created_at}</p>

                                    <div className="h-60 w-full my-2 py-2 overflow-y-scroll">
                                        <ul>
                                            {!loading && body && data.type === 'success' &&
                                                body.map((element, index) => (
                                                    <li
                                                        key={index}
                                                        className="bg-green-200 border border-green-500 cursor-pointer hover:bg-green-300 mb-2  rounded-lg flex mx-2 shadow"
                                                    >
                                                        <a
                                                            href={route(
                                                                "title.show",
                                                                {
                                                                    id: element.id,
                                                                }
                                                            )}
                                                            target="_blank"
                                                            className="min-w-full rounded-lg py-2"
                                                        >
                                                            {element.title}
                                                        </a>
                                                    </li>
                                                ))}

                                            {!loading && body && data.type === 'error' ? <p>{data.body}</p> : ''}
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
