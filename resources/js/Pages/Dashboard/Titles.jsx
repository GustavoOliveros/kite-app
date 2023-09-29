import Dashboard from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Titles({ titles, auth }) {
    return (
        <>
            <Head title="Títulos" />
            <Dashboard title="Títulos">
                <div className="flex gap-2">
                    <ul>
                        {titles && titles.length > 0 ? (
                            titles.map((element, index) => <li key={index}>{element.title}</li>)
                        ) : (
                            <p className="text-white">No se encontraron resultados...</p>
                        )}
                    </ul>
                    
                </div>
            </Dashboard>
        </>
    );
}
