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
            {/*  w-full max-w-[20rem] fixed top-0 left-0 h-screen p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bg-gray-800 text-white hidden md:block */}

           
            {/* falta responsive xd */}
            <div className="text-white w-full md:ps-5 md:ms-[calc(100%-20rem)]">
                <Link href={route('home')}>
                    <Button className="mb-5 bg-gray-800 shadow-none">
                        <ArrowLeftIcon className="h-5 w-5 pe-2 inline" /> Volver a Kite
                    </Button>
                </Link>

                

                <h1 className="text-3xl uppercase mb-5">{title}</h1>
                {children}
            </div>
        </div>
    );
}
