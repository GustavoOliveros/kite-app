import PlayButton from "./PlayButton";
import {
    PlusIcon,
    SquaresPlusIcon,
    CheckIcon,
    BellIcon,
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
        <div className="space-y-3 md:space-y-0 md:flex gap-2">
            {/* PLAY BUTTON */}
            <PlayButton
                services={services}
                openModal={openWatchModal}
                saveHistory={saveHistory}
                loadingWatch={loadingWatch}
                setLoadingWatch={setLoadingWatch}
            />

            {/* LIBRARY BUTTON */}
            <div className="grid grid-cols-3 py-1 md:flex gap-2 md:py-0">
                <Button
                    onClick={saveLibraryChanges}
                    className="bg-transparent p-2 md:border border-white text-white flex flex-col md:flex-row justify-center items-center gap-3 md:gap-0 md:p-5"
                    title={
                        saved
                            ? "Eliminar de biblioteca"
                            : "Agregar a biblioteca"
                    }
                >
                    {loading ? (
                        <Spinner className="animate-spin h-8 w-8 md:h-4 md:w-4" />
                    ) : saved ? (
                        <CheckIcon className="h-8 w-8 md:h-4 md:w-4" />
                    ) : (
                        <SquaresPlusIcon className="h-8 w-8 md:h-4 md:w-4" />
                    )}
                    &nbsp; Biblioteca
                </Button>

                {/* PLAYLIST BUTTON */}
                <Button
                    onClick={openListModal}
                    className="bg-transparent p-2 md:border border-white text-white flex flex-col md:flex-row justify-center items-center gap-3 md:gap-0 md:p-5"
                    title="Agregar o eliminar a lista de reproducción"
                >
                    <PlusIcon className="h-8 w-8 md:h-4 md:w-4" /> &nbsp; Lista
                </Button>

                <Reminder />
            </div>
        </div>
    );
}
