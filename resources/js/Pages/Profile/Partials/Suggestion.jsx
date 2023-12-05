import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function Suggestion({ suggestion }) {
    const dateString = suggestion.created_at;
    const suggestionDate = new Date(dateString);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("es-AR", options).format(
        suggestionDate
    );

    return (
        <>
            <div
                className={`relative py-6 px-5 text-start text-md rounded-lg w-full bg-gray-800 border-s-8 text-white ${
                    suggestion.status ? "border-green-500" : ""
                }`}
            >
                <h1>
                    {suggestion.title} ({suggestion.year}){" "}
                    {suggestion.status ? (
                        <Link
                            href={route("title.show", { id: suggestion.id })}
                            className=""
                        >
                           <EyeIcon className="w-5 h-5 inline-flex pb-1" />
                        </Link>
                    ) : (
                        ""
                    )}
                </h1>
                <p className="">
                    {suggestion.status ? "Aceptado" : "En espera"}
                </p>
                <p className="text-sm text-gray-400">{formattedDate}</p>
            </div>
        </>
    );
}
