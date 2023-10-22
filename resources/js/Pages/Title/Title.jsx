import { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/Components/Modal";

import TitleHeader from "./partials/TitleHeader";
import Buttons from "./partials/Buttons";
import ListModal from "./partials/ListModal";
import PlayModal from "./partials/PlayModal";
import ServicesTitle from "./partials/ServicesTitle";
import AskModal from "./partials/AskModal";


export default function Title({ auth, title, services, alreadySaved }) {
    // HOOKS

    const [loading, setLoading] = useState(false);
    const [loadingWatch, setLoadingWatch] = useState(false);
    const [saved, setSaved] = useState(alreadySaved);
    const [modalType, setModalType] = useState('watch');
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState('');

    // MODAL FUNCTIONS
    
    const openModal = () => {
        setIsOpen(true)
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const openListModal = (e) => {
        setModalType('list');
        openModal();
    };
    const openWatchModal = (e) => {
        setModalType('watch');
        openModal();
    };
    const openAskErrorModal = (e) => {
        setModalType('askError');
        openModal();
    };
    const openAskNoSubModal = (e) => {
        setModalType('askNoSub');
        openModal();
    };

    // LIBRARY FUNCTIONS

    const callback = (response) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            setSaved(!saved);
        } else {
            toast.error(response.data.message);
            console.error(response)
        }
    };

    const updateLibrary = (titleId) => {
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

    const saveLibraryChanges = (e) => {
        setLoading(true);
        updateLibrary(title.id);
    };

    // WATCH FUNCTIONS

    const responseHandler = (response, link) => {
        if (response.data.type === "success") {
            toast.success(response.data.message);
            window.location.href = link;
        } else {
            setLoadingWatch(false);
            toast.error(response.data.message);
            setLink(link);
            openAskErrorModal();
        }
    };
    const saveHistory = (link) => {
        return axios
            .get(
                route("saveHistory", {
                    id: title.id,
                })
            )
            .then((response) => {
                responseHandler(response, link);
            })
            .catch((error) => {
                setLoadingWatch(false);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde");
                setLink(link);
                openAskErrorModal();
            });
    };

    return (
        <>
            {/* LAYOUT */}
            <Head title={"Ver " + title.title} />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
                backgroundImagePath={title.backdrop_path}
            >
                <div className="text-white">
                    {/* POSTER (MOBILE VERSION) */}
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

                    {/* TITLE INFO + BUTTONS */}
                    <div className="w-full md:h-screen">
                        <div className="flex flex-col w-full gap-3 md:h-screen md:py-28">
                            <TitleHeader title={title} />

                            <Buttons
                                services={services}
                                openWatchModal={openWatchModal}
                                saveHistory={saveHistory}
                                loadingWatch={loadingWatch}
                                setLoadingWatch={setLoadingWatch}
                                saveLibraryChanges={saveLibraryChanges}
                                loading={loading}
                                saved={saved}
                                openListModal={openListModal}
                            />

                            <p className="md:w-1/2 my-4">{title.overview}</p>

                            <ServicesTitle services={services} />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>

            {/* OFF-LAYOUT (Modal & Toast) */}
            <Toaster />
            <Modal show={isOpen} onClose={closeModal} maxWidth="xl">
                {modalType === "watch" ? (
                    <PlayModal
                        onClose={closeModal}
                        services={services}
                        saveHistory={saveHistory}
                        loadingWatch={loadingWatch}
                        setLoadingWatch={setLoadingWatch}
                        openAskNoSubModal={openAskNoSubModal}
                        setLink={setLink}
                    />
                ) : (
                    ""
                )}
                {modalType === "list" ? (
                    <ListModal onClose={closeModal} titleId={title.id} />
                ) : (
                    ""
                )}
                {modalType === "askError" ? (
                    <AskModal
                        modalType="askError"
                        loadingWatch={loadingWatch}
                        setLoadingWatch={setLoadingWatch}
                        onClose={closeModal}
                        link={link}
                        saveHistory={saveHistory}
                    />
                ) : (
                    ""
                )}
                {modalType === "askNoSub" ? (
                    <AskModal
                        modalType="askNoSub"
                        loadingWatch={loadingWatch}
                        setLoadingWatch={setLoadingWatch}
                        onClose={closeModal}
                        link={link}
                        saveHistory={saveHistory}
                    />
                ) : (
                    ""
                )}
            </Modal>
        </>
    );
}

    
  