import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Search({ auth }) {
    return (
        <>
            <Head title="Kite App - Todo en un solo lugar" />
            <AuthenticatedLayout user={auth.user} />
        </>
    );
}
