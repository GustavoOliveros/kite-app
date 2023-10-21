import { PlayIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PlayButton({services}) {
    // SI ES UN UNICO SERVICIO -> LINK (LISTO)
    // SI ES MAS DE UNO -> MODAL
    // SI ES NINGUNO (PERO ESTA EN OTRO) -> MODAL
    // SI ES NINGUNO (NO ESTA EN NINGUNO) -> NADA (LISTO)

    // TENDRIAN QUE LLEGAR TODOS LOS SERVICIOS DONDE EL TITLE ESTA DISP. CON UNA CLAVE BOOLEANA PARA DIFERENCIAR SI
    // EL USUARIO LO TIENE CONTRATADO O NO
    const [ loading, setLoading ] = useState(false);

    const responseHandler = (response) => {
        if(response.data.type === 'success'){
            toast.success(response.data.message);
            window.location.href = services[0].title_on_service.link;
        }else{
            setLoading(false);
            toast.error(response.data.message);
            // modal preguntando si quiere continuar de todos modos
        }
    }

    const saveHistory = () => {
        return axios.get(route('saveHistory', {id: services[0].title_on_service.title_id}))
                    .then((response) => {
                        responseHandler(response);
                    })
                    .catch((error) => {
                        setLoading(false);
                        // modal preguntando si quiere continuar de todos modos
                        toast.error('Ocurrió un error. Inténtelo de nuevo más tarde');
                    })
    }


    const watchTitle = () => {
        setLoading(true);
        if(services.length === 1 && services[0].isUserSubscribed){
            saveHistory();  
        }else{
            setLoading(false);
            // modal
        }
    };

    return(
    <Button className="bg-white text-black md:p-5 flex justify-center" disabled={services.length <= 0} onClick={watchTitle}>
        {loading ? <Spinner className='animate-spin h-4 w-4' /> : <PlayIcon className="w-4 h-4" />} &nbsp; {services.length <= 0 ? 'No disponible' : 'Ver'}
    </Button>
    );
}
