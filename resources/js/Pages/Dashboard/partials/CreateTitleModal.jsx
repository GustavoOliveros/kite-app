import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useState, Fragment } from "react";
import toast from 'react-hot-toast';
import { PlusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Spinner } from '@material-tailwind/react';

export default function CreateTitleModal({isModalOpen, closeModal, updateTable, callback}) {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);


    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        selectedValue['tmdb_id'] = selectedValue.media_type + '/' + selectedValue.id;

        return axios
            .post(
                route("title.store", selectedValue)
            )
            .then((response) => {
                setLoading(false);
                closeModal();
                updateTable();
                setSelectedValue([]);
                callback(response);
                console.log(response);
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status == 422) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(
                        "Ocurrió un error. Inténtelo de nuevo más tarde."
                    );
                }
                console.log(error);
            });
    }

    const fetchData = (e) => {
        e.preventDefault();
        setLoading(true);

        return axios
            .get(
                route("getTitlesFromAPI", {query: query})
            )
            .then((response) => {
                setLoading(false);
                
                if(response.data.type === 'error'){
                    toast.error(response.data.message);
                }else{
                    setData(response.data.results);
                }

                console.log(response);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.error(error);
            });
    }

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
                                        <InputLabel
                                            htmlFor="query"
                                            className="!text-lg font-light"
                                        >
                                            {loading ? <Spinner className="animate-spin w-5 h-5 inline" /> : <PlusIcon className='w-5 h-5 inline ' />} Crear Título
                                        </InputLabel>
                                    </Dialog.Title>
                                    <div className="my-2">
                                        <form onSubmit={fetchData}>
                                            <TextInput
                                                className="w-full"
                                                name="query"
                                                id="query"
                                                placeholder="Palabra clave..."
                                                onChange={(e) =>
                                                    setQuery(e.target.value)
                                                }
                                            />
                                        </form>
                                    </div>
                                    <div>
                                        <h1 className='font-bold'>Su elección</h1>
                                        <ul>
                                            <li
                                                className={
                                                    selectedValue.id
                                                        ? "flex gap-2 justify-center"
                                                        : "text-transparent flex gap-2 justify-center"
                                                }
                                            >
                                                {selectedValue.title
                                                    ? selectedValue.title
                                                    : selectedValue.name}{" "}
                                                (
                                                {selectedValue.release_date
                                                    ? selectedValue.release_date.substring(
                                                          0,
                                                          4
                                                      )
                                                    : null}
                                                {selectedValue.first_air_date
                                                    ? selectedValue.first_air_date.substring(
                                                          0,
                                                          4
                                                      )
                                                    : null}
                                                )
                                                <a href={`https://www.themoviedb.org/${selectedValue.media_type}/${selectedValue.id}`} target="_blank"><ArrowTopRightOnSquareIcon className="w-5 h-5 cursor-pointer" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-200 h-60 my-5 overflow-y-scroll">
                                        <form
                                            onSubmit={submitHandler}
                                            id="store-form"
                                        >
                                            {data &&
                                                data.length > 0 &&
                                                data.map((element, index) =>
                                                    element.media_type !=
                                                    "person" ? (
                                                        <div
                                                            key={index}
                                                            className="py-2 hover:bg-gray-300 cursor-pointer"
                                                            onClick={(e) =>
                                                                setSelectedValue(
                                                                    element
                                                                )
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
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-black px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            type="submit"
                                            form="store-form"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            Guardar
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



