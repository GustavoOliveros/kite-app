import { PlayIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";

export default function PlayButton({ services, openModal, saveHistory, loadingWatch, setLoadingWatch }) {
    // WATCH TITLE HANDLER

    const watchTitle = () => {
        setLoadingWatch(true);
        if (services.length === 1 && services[0].isUserSubscribed) {
            saveHistory(services[0].title_on_service.link, services[0].service.id_name);
        } else {
            setLoadingWatch(false);
            openModal();
        }
    };
    
    return (
        <Button
            className="bg-white text-black md:p-5 flex justify-center"
            disabled={services.length <= 0}
            onClick={watchTitle}
        >
            {loadingWatch ? (
                <Spinner className="animate-spin h-4 w-4" />
            ) : (
                <PlayIcon className="w-4 h-4" />
            )}{" "}
            &nbsp; {services.length <= 0 ? "No disponible" : "Ver"}
        </Button>
    );
}
