import { Link } from "@inertiajs/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import TitleCardData from "./TitleCardData";

export default function DeletableTitleCard({
    data,
    className = "",
    isDeletable,
    fetchData
}) {
    const ruta = data.type ? "title.show" : "playlist.show";
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = () => {
        setIsLoading(false);
    };

    return (
        <>
            {!isDeletable ? (
                <Link href={route(ruta, { id: data.id })}>
                    <TitleCardData
                        data={data}
                        className={className}
                        loadHandler={loadHandler}
                        isLoading={isLoading}
                        isDeletable={false}
                        fetchData={fetchData}
                    />
                </Link>
            ) : (
                <TitleCardData
                    data={data}
                    className={className}
                    loadHandler={loadHandler}
                    isLoading={isLoading}
                    isDeletable={true}
                    fetchData={fetchData}
                />
            )}
        </>
    );
}
