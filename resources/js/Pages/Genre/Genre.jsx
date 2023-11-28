import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';

export default function Genre({ auth, titles, genre }) {
    return (
        <>
            <Head title={genre.name} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className=' flex flex-col md:flex-row justify-center items-center text-center md:text-start h-[40vh] '>
                    <h1 className='text-4xl text-white my-5'>{genre.name}</h1>
                </div>
                <div>
                    <SearchResults data={titles} showNoResults={false} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
