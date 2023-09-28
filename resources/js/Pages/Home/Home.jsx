import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '@/Components/SearchResults';
import Select_Service from './partials/Select_Service';

export default function Home({ auth, services, titles }) {
    return (
        <>
            <Head title="Home" />
            <AuthenticatedLayout user={auth.user}>
                <h1 className="text-2xl text-white text-center mt-8">¡Bienvenido, {auth.user.name}!<br />¿Qué deseas ver?</h1>
                <div className="flex-wrap justify-center gap-4 my-10 hidden md:flex">
                    {services && services.length > 0 ? (
                        services.map((element, index) => <Select_Service key={index} service={element}  />)
                    ) : (
                        <p className="text-white">Ocurrió un error. Intente más tarde...</p>
                    )}
                </div>
                <div>
                    <SearchResults data={titles} showNoResults={false} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
