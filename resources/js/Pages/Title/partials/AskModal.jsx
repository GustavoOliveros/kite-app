import { Dialog } from "@headlessui/react";
import { FilmIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function AskModal({onClose, loadingWatch, setLoadingWatch, serviceId, link, modalType, saveHistory}) {
    const handleClick = () => {
        setLoadingWatch(true);
        if(modalType === 'askNoSub'){
            saveHistory(link, serviceId);
        }else{
            toast.success('Redireccionando...');
            window.location.href = link;
        }
    }

    return (
        <div className="p-5">
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-white"
            >
                <div className="flex justify-center mb-2 gap-2">
                    {loadingWatch ? (
                        <Spinner className="animate-spin w-5 h-5" />
                    ) : (
                        <FilmIcon className="w-5 h-5" />
                    )}{" "}
                    ¿Desea continuar?
                </div>
            </Dialog.Title>

            {/* Content  */}
            <div className="flex flex-col text-center text-white">
                <p>
                    {modalType === "askError"
                        ? "Ocurrió un error al guardar el historial."
                        : "Seleccionó un servicio no contratado."}
                </p>
                <p>¿Desea continuar de todos modos?</p>
            </div>

            {/* Footer */}
            <div className="mt-8 flex gap-3 justify-center">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border bg-white border-black   px-4 py-2 text-sm text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={handleClick}
                >
                    Continuar de todos modos
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-white  px-4 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
