import Dashboard from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { CardDefault } from '@/Components/Card';

export default function DashboardHome({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <Dashboard title="Dashboard">
                <div className="flex gap-2">
                    <CardDefault />
                    <CardDefault />
                    <CardDefault />
                </div>
            </Dashboard>
        </>
    );
}
