import { PlayIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlayButton({services}) {
    // SI ES UN UNICO SERVICIO -> LINK (LISTO)
    // SI ES MAS DE UNO -> MODAL
    // SI ES NINGUNO (PERO ESTA EN OTRO) -> MODAL
    // SI ES NINGUNO (NO ESTA EN NINGUNO) -> NADA (LISTO)

    // TENDRIAN QUE LLEGAR TODOS LOS SERVICIOS DONDE EL TITLE ESTA DISP. CON UNA CLAVE BOOLEANA PARA DIFERENCIAR SI
    // EL USUARIO LO TIENE CONTRATADO O NO

    // 

    const saveHistory = () => {
        return axios.post(route('saveHistory', {titleId: services[0].title_on_service.title_id}))
                    .then((response) => {
                        window.location.href = services[0].title_on_service.link;
                    })
                    .catch((error) => {
                        toast.error('Ocurrió un error. Inténtelo de nuevo más tarde');
                    })
    }


    const watchTitle = () => {
        if(services.length === 1 && services[0].isUserSubscribed){
            // saveHistory
            
        }
    };

    return(
    <Button className="bg-white text-black md:p-5 flex justify-center" disabled={services.length <= 0} onClick={watchTitle}>
        <PlayIcon className="w-4 h-4" /> &nbsp; {services.length <= 0 ? 'No disponible' : 'Ver'}
    </Button>
    );
}
