import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';

export default function History({ auth, titles }) {
    return (
        <>
        {console.log(titles)}
            <Head title="Mi Historial" />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className='flex flex-col md:flex-row md:gap-5 text-center md:text-start'>
                    <h1 className='text-4xl text-white my-5'>Historial</h1>
                </div>
                <div>
                    <SearchResults data={titles} showNoResults={false} />
                </div>
            </AuthenticatedLayout>
        </>
    );
}
