import Dashboard from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { StatsCard } from '@/Components/StatsCard';

export default function DashboardHome({ auth, countTitles, countUsers }) {
    return (
        <>
            <Head title="Dashboard" />
            <Dashboard title="Dashboard">
                <div className="flex gap-2">
                    <StatsCard title="Cantidad de Usuarios" number={countUsers} />
                    <StatsCard title="Cantidad de Títulos" number={countTitles} />
                </div>
            </Dashboard>
        </>
    );
}
