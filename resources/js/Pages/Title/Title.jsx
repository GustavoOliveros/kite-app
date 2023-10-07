import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@material-tailwind/react';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function Title({ auth, title, services }) {
    return (
        <>
            {console.log(services)}
            <Head title={"Ver " + title.title} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions} backgroundImagePath={title.backdrop_path}>
                <div className="text-white">
                    <img src={'https://image.tmdb.org/t/p/w1920_and_h1080_bestv2' + title.backdrop_path} alt={'Póster de la película ' + title.title + ' (' + title.year + ').'} className="md:hidden" />
                    <div className="w-full md:h-screen">
                        <div className="flex flex-col w-full gap-3 px-3 md:h-screen md:p-28">
                            <h1 className="text-3xl my-4 text-center md:text-start">{title.title} <span className="text-sm text-gray-300">({title.year})</span></h1>
                            <div className="flex gap-3 flex-col md:flex-row">
                                <Button className="bg-white text-black md:p-5 flex justify-center">
                                    <PlayIcon className="w-4 h-4" /> &nbsp; Ver
                                </Button>
                                <Button className="bg-transparent border border-white text-white">Agregar a Biblioteca</Button>
                            </div>
                            <p className="md:w-1/2 my-4">
                                {title.overview}
                            </p>
                            <div className="flex gap-5 mb-20">
                                {services && services.length > 0 ? (
                                    services.map((element, index) => <img key={index} className="w-10" src={element.service.logo_path} alt={'Logo de ' + element.service.name} />)
                                ) : (
                                    <p className="text-white">No se encontraron resultados...</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </AuthenticatedLayout>
        </>
    );
}
