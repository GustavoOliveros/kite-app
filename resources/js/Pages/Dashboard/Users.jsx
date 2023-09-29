import Dashboard from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Users({ users, auth }) {
    return (
        <>
            <Head title="Usuarios" />
            <Dashboard title="Usuarios">
                <div className="flex gap-2">
                    <ul>
                        {users && users.length > 0 ? (
                            users.map((element, index) => <li key={index}>{element.username}</li>)
                        ) : (
                            <p className="text-white">No se encontraron resultados...</p>
                        )}
                    </ul>
                    
                </div>
            </Dashboard>
        </>
    );
}
