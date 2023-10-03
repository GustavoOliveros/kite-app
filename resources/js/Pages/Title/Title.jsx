import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Title({ auth, title }) {
    return (
        <>
            <Head title={title.title} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className="text-white">
                    {JSON.stringify(title)}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
