import { Dialog } from "@headlessui/react";
import { FilmIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

export default function WatchModal({ onClose, services, saveHistory, loadingWatch, setLoadingWatch, link, setLink }) {
    return (
        <div className="p-5">
            {console.log(link)}
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
            >
                <div className="flex justify-center mb-2 gap-2">
                    <FilmIcon className="w-5 h-5" /> Títulos
                </div>
                <hr />
            </Dialog.Title>

            {/* Contenido del Modal */}
            <hr />


            <div className="flex justify-center items-center gap-3">
                {services && services.length > 0 ? (
                    services.map((element, index) => (
                        <Button key={index} className="bg-zinc-900 p-5 rounded-lg my-5 cursor-pointer" onClick={(e) => {setLink(element.title_on_service.link);}}>
                            <img
                                className="w-10 h-10"
                                src={element.service.logo_path}
                                alt={
                                    "Logo de " +
                                    element.service.name
                                }
                                
                            />
                        </Button>
                    ))
                ) : (
                    <p className="text-white">
                        No está disponible en ningún servicio de
                        streaming.
                    </p>
                )}
            </div>


            <div className="mt-4 flex gap-3 justify-center">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-black bg-white border-gray-800 px-4 py-2 text-sm text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
