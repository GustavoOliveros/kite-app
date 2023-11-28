import { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/Components/Modal";
import { Link } from "@inertiajs/react";

import TitleHeader from "./partials/TitleHeader";
import Buttons from "./partials/Buttons";
import ListModal from "./partials/ListModal";
import PlayModal from "./partials/PlayModal";
import ServicesTitle from "./partials/ServicesTitle";
import AskModal from "./partials/AskModal";
import Reviews from "./partials/Reviews";


export default function Title({ auth, title, services, alreadySaved, genres, flag, reviews }) {
    // HOOKS

    const [loading, setLoading] = useState(false);
    const [loadingWatch, setLoadingWatch] = useState(false);
    const [saved, setSaved] = useState(alreadySaved);
    const [modalType, setModalType] = useState('watch');
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState('');
    const [serviceId, setServiceId] = useState('');

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
    const saveHistory = (link, serviceId) => {
        return axios
            .get(
                route("saveHistory", {
                    id: title.id,
                    service: serviceId
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
                            "Póster de " +
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
                            <TitleHeader title={title} flag={flag} />

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

                            <p className="md:w-1/2 my-4 px-2 md:px-0">{title.overview}</p>
                            <div className="flex flex-col md:flex-row gap-2 mb-4">
                                {genres &&
                                    genres.map((element, index) => (
                                        <Link
                                            href={route('genres.show', {id : element.id})}
                                            className="text-sm text-white text-center border-2 p-2 rounded-lg"
                                            key={index}
                                        >
                                            {element.name}
                                        </Link>
                                    ))}
                            </div>

                            <ServicesTitle services={services} />
                        </div>
                    </div>
                    <Reviews reviews={reviews} titleId={title.id} />

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
                        setServiceId={setServiceId}
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
                        serviceId={serviceId}
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
                        serviceId={serviceId}
                        saveHistory={saveHistory}
                    />
                ) : (
                    ""
                )}
            </Modal>
        </>
    );
}

    
  