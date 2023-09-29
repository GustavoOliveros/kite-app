import Sidebar from "./partials/Sidebar";
import {
    ArrowLeftIcon
  } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import {
    Button,
  } from "@material-tailwind/react";

export default function Dashboard({ auth, title, children }) {
    return (
        <div className="min-h-screen bg-zinc-900 flex p-5">
            <Sidebar />

           
            {/* falta responsive */}
            <div className="text-white w-full ps-5">
                <Link href={route('home')}>
                    <Button className="border mb-5 hover:bg-gray-800">
                        <ArrowLeftIcon className="h-5 w-5 pe-2 inline" /> Volver a Kite
                    </Button>
                </Link>

                

                <h1 className="text-3xl uppercase">{title}</h1>
                {children}
            </div>
        </div>
    );
}
