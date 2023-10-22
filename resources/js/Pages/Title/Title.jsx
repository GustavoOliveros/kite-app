import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@material-tailwind/react";
import {
    SquaresPlusIcon,
    CheckIcon,
    PlusIcon
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import PlayButton from "./partials/PlayButton";
import Modal from "@/Components/Modal";
import ListModal from "./partials/ListModal";
import WatchModal from "./partials/WatchModal";

export default function Title({ auth, title, services, alreadySaved }) {
    const [loading, setLoading] = useState(false);
    const [loadingWatch, setLoadingWatch] = useState(false);
    const [saved, setSaved] = useState(alreadySaved);
    const [modalType, setModalType] = useState('watch');
    const [link, setLink] = useState('');

    let [isOpen, setIsOpen] = useState(false)
    
    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            setSaved(!saved);
        } else {
            toast.error(response.data.message);
        }
    };

    const submit = (titleId) => {
        if (saved) {
            return axios
                .delete(route("deleteFromLibrary", { titleId: titleId }))
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
            .post(route("saveToLibrary", { id: titleId }))
            .then((response) => {
                setLoading(false);
                callback(response);
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    };

    const openLibraryInput = (e) => {
        setLoading(true);
        submit(title.id);
    };

    const openListModal = (e) => {
        setModalType('list');
        openModal();
    };

    const openWatchModal = (e) => {
        setModalType('watch');
        openModal();
    };
    
    const responseHandler = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            window.location.href = services[0].title_on_service.link;
        } else {
            setLoadingWatch(false);
            toast.error(response.data.message);
            // modal preguntando si quiere continuar de todos modos
        }
    };

    const saveHistory = () => {
        return axios
            .get(
                route("saveHistory", {
                    id: services[0].title_on_service.title_id,
                })
            )
            .then((response) => {
                responseHandler(response);
            })
            .catch((error) => {
                setLoadingWatch(false);
                // modal preguntando si quiere continuar de todos modos
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde");
            });
    };

    return (
        <>
            <Head title={"Ver " + title.title} />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
                backgroundImagePath={title.backdrop_path}
            >
                <div className="text-white">
                    <img
                        src={
                            "https://image.tmdb.org/t/p/w1920_and_h1080_bestv2" +
                            title.backdrop_path
                        }
                        alt={
                            "Póster de la película " +
                            title.title +
                            " (" +
                            title.year +
                            ")."
                        }
                        className="md:hidden"
                    />
                    <div className="w-full md:h-screen">
                        <div className="flex flex-col w-full gap-3 md:h-screen md:py-28">
                            <h1 className="text-3xl my-4 text-center md:text-start">
                                {title.title}{" "}
                                <span className="text-sm text-gray-300">
                                    ({title.year})
                                </span>
                            </h1>
                            <div className="flex gap-3 flex-col md:flex-row">
                                {/* PLAY BUTTON */}
                                <PlayButton
                                    services={services}
                                    openModal={openWatchModal}
                                    saveHistory={saveHistory}
                                    loadingWatch={loadingWatch}
                                    setLoadingWatch={setLoadingWatch}
                                />

                                {/* LIBRARY BUTTON */}
                                <Button
                                    onClick={openLibraryInput}
                                    className="bg-transparent border border-white text-white flex justify-center md:p-5"
                                >
                                    {loading ? (
                                        <Spinner className="animate-spin h-4 w-4" />
                                    ) : saved ? (
                                        <CheckIcon className="h-4 w-4" />
                                    ) : (
                                        <SquaresPlusIcon className="h-4 w-4" />
                                    )}
                                    &nbsp; Biblioteca
                                </Button>

                                {/* PLAYLIST BUTTON */}
                                <Button
                                    onClick={openListModal}
                                    className="bg-transparent border border-white text-white flex justify-center md:p-5"
                                >
                                    <PlusIcon className="w-4 h-4" /> &nbsp;
                                    Lista
                                </Button>
                            </div>
                            <p className="md:w-1/2 my-4">{title.overview}</p>

                            <div className="flex gap-5 mb-20">
                                {services && services.length > 0 ? (
                                    services.map((element, index) => (
                                        <img
                                            key={index}
                                            className="w-10"
                                            src={element.service.logo_path}
                                            alt={
                                                "Logo de " +
                                                element.service.name
                                            }
                                        />
                                    ))
                                ) : (
                                    <p className="text-white">
                                        No está disponible en ningún servicio de
                                        streaming.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Toaster />
            <Modal show={isOpen} onClose={closeModal} maxWidth="xl">
                {modalType === "watch" ? (
                    <WatchModal
                        onClose={closeModal}
                        services={services}
                        saveHistory={saveHistory}
                        loadingWatch={loadingWatch}
                        setLoadingWatch={setLoadingWatch}
                        link={link}
                        setLink={setLink}
                    />
                ) : (
                    <ListModal onClose={closeModal} titleId={title.id} />
                )}
            </Modal>
        </>
    );
}
