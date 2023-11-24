import PlayButton from "./PlayButton";
import {
    PlusIcon,
    SquaresPlusIcon,
    CheckIcon,
    BellIcon
} from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";
import Reminder from "./Reminder";

export default function Buttons({
    services,
    openWatchModal,
    saveHistory,
    loadingWatch,
    setLoadingWatch,
    saveLibraryChanges,
    loading,
    saved,
    openListModal,
}) {

    return (
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
                onClick={saveLibraryChanges}
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
                <PlusIcon className="w-4 h-4" /> &nbsp; Lista
            </Button>

            <Reminder />
        </div>
    );
}
