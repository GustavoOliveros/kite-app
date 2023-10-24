import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';

export default function Genre({ auth, titles, genre }) {
    return (
        <>
            <Head title={genre.name} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className='relative flex flex-col md:flex-row items-center md:gap-5 text-center md:text-start'>
                    <h1 className='text-4xl text-white my-5'>{genre.name}</h1>
                    <span className='text-white border-2 p-2 rounded-lg'>{titles.length}</span>
                </div>
                <div>
                    <SearchResults data={titles} showNoResults={false} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
