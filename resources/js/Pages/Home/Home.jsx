import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />
            <AuthenticatedLayout user={auth.user} />
        </>
    );
}
