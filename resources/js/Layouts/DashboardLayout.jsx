import Sidebar from "./partials/Sidebar";

export default function Dashboard({ auth, title, children }) {
    return (
        <div className="min-h-screen bg-zinc-900 flex p-5">
            <Sidebar />


            {/* Sidebar (desktop)/menu hamburguesa (mobile)
                enlaces
                e:perfil
                e:volver a la aplicacion
                e:cerrar sesion
            contenido
                titulo
                tabla */}
            <div className="text-white p-5 w-full">
                <h1 className="text-xl">{title}</h1>
                {children}
            </div>
        </div>
    );
}
