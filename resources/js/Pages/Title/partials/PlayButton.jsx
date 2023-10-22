import { PlayIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";

export default function PlayButton({ services, openModal, saveHistory, loadingWatch, setLoadingWatch }) {
    // SI ES UN UNICO SERVICIO -> LINK (LISTO)
    // SI ES MAS DE UNO -> MODAL
    // SI ES NINGUNO (PERO ESTA EN OTRO) -> MODAL
    // SI ES NINGUNO (NO ESTA EN NINGUNO) -> NADA (LISTO)

    // TENDRIAN QUE LLEGAR TODOS LOS SERVICIOS DONDE EL TITLE ESTA DISP. CON UNA CLAVE BOOLEANA PARA DIFERENCIAR SI


    const watchTitle = () => {
        setLoadingWatch(true);
        if (services.length === 1 && services[0].isUserSubscribed) {
            saveHistory();
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
