import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@material-tailwind/react';

export default function Title({ auth, title }) {
    return (
        <>
            <Head title={"Ver " + title.title} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className="text-white">
                    {/* {JSON.stringify(title)} */}
                    <img src={'https://image.tmdb.org/t/p/w600_and_h600_bestv2' + title.backdrop_path} alt="" className="" />
                    <div className="flex flex-col gap-3 px-3">
                        <h1 className="text-3xl my-4 text-center">{title.title}</h1>
                        <Button className="bg-white text-black">Ver</Button>
                        <Button className="bg-black text-white">Agregar a Biblioteca</Button>
                    </div>
                    
                </div>
            </AuthenticatedLayout>
        </>
    );
}
