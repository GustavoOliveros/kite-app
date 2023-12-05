import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function ServiceHome({ service }) {
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = () => {
        setIsLoading(false);
    }

    return (
        <Link
            className="flex justify-center md:p-10 rounded-md font-semibold text-xs text-white uppercase  focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out delay-150 hover:scale-110 md:hover:scale-150 duration-300"
            disabled={false}
            href={route("service.show", { id_name: service.id_name })}
            target="_blank"
        >
            <img
                src={service.logo_path}
                className="w-20 h-20"
                alt={service.name}
                style={{ display: isLoading ? "none" : "block" }}
                onLoad={loadHandler}
            />
            <img
                className="rounded-lg animate-pulse w-20 h-20"
                alt={service.name}
                style={{ display: isLoading ? "block" : "none" }}
                src="/img/zinc900-900x600.png"
            />
        </Link>
    );
}
