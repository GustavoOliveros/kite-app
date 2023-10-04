import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@material-tailwind/react';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function Title({ auth, title }) {
    return (
        <>
            <Head title={"Ver " + title.title} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className="text-white">
                    <img src={'https://image.tmdb.org/t/p/w1280_and_h720_bestv2' + title.backdrop_path} alt={'Póster de la película ' + title.title + ' (' + title.year + ').'} className="md:hidden" />
                    <div className="w-full md:h-screen bg-cover" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w1280_and_h720_bestv2${title.backdrop_path}')` }}>
                        <div className="flex flex-col bg-gray-800 w-full gap-3 px-3 md:bg-black/80 md:h-screen md:p-28">
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
                        </div>
                    </div>

                </div>
            </AuthenticatedLayout>
        </>
    );
}
