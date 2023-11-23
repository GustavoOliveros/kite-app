import { Dialog } from "@headlessui/react";
import { CheckCircleIcon,  FilmIcon } from "@heroicons/react/24/solid";
import { Button, Spinner } from "@material-tailwind/react";

export default function PlayModal({onClose, services, saveHistory, loadingWatch, setLoadingWatch, setServiceId, openAskNoSubModal, setLink}) {
    const handleClick = (link, isUserSubscribed, serviceId) => {
        if(isUserSubscribed){
            setLoadingWatch(true);
            saveHistory(link, serviceId);
        }else{
            setLink(link);
            setServiceId(serviceId);
            openAskNoSubModal();
        }
    }

    return (
        <div className="p-5">
            <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-light text-white"
            >
                <div className="flex justify-center mb-2 gap-2">
                    {loadingWatch ? <Spinner className="animate-spin w-5 h-5" /> : <FilmIcon className="w-5 h-5" />} Servicios disponibles
                </div>
               
            </Dialog.Title>

       

            {/* Content  */}
            <div className="grid grid-cols-2 md:flex md:justify-center md:items-center md:gap-5">
                {services && services.length > 0 ? (
                    services.map((element, index) => (
                        <div className="flex flex-col justify-center text-center items-center" key={index}>
                            <Button
                                className="relative bg-zinc-900 p-5 rounded-lg mt-5 cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300"
                                onClick={(e) => {handleClick(element.title_on_service.link, element.isUserSubscribed, element.service.id_name)}}
                            >
                                <img
                                    className="w-10 h-10"
                                    src={element.service.logo_path}
                                    alt={element.service.name}
                                />
                                {element.isUserSubscribed ? <CheckCircleIcon className="w-5 h-5 absolute top-0 right-0 m-1" /> : ''}
                            </Button>

                            <span className='text-white text-xs mt-2'>{element.isUserSubscribed ? 'Contratado' : <>Desde ${Number(element.service.price).toFixed(2)}</>}</span>
                            <span className="text-white text-xs">{element.title_on_service.quality.toUpperCase()}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-white">
                        No está disponible en ningún servicio de streaming.
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="mt-8 flex gap-3 justify-center">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-white px-4 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
