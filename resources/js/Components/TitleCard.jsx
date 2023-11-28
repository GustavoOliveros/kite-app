import { Link } from "@inertiajs/react";
import { ListBulletIcon, NoSymbolIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState, useCallback, memo } from "react";

const TitleCard = memo(({ data, className = "" }) => {
    const ruta = data.type ? "title.show" : "playlist.show";
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <Link href={route(ruta, { id: data.id })} title={data.title}>
                <div className={`relative flex justify-center items-center border-2  rounded-lg cursor-pointer transition ease-in-out delay-150 md:hover:scale-110 duration-300 ${data.isUserSubscribed !== undefined && !data.isUserSubscribed ? 'border-red-500 hover:border-red-500': 'border-transparent hover:border-white'}`}>
                    <img
                        className={" rounded-lg " + className}
                        src={
                            data.poster_path
                                ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" +
                                  data.poster_path
                                : "/img/zinc900-900x600.png"
                        }
                        alt={data.title + " "}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={loadHandler}
                    />
                    <img
                        className={" rounded-lg animate-pulse" + className}
                        style={{ display: isLoading ? "block" : "none" }}
                        src="/img/zinc900-900x600.png"
                        alt={data.title + " "}
                    />
                    <h1
                        className={`${
                            data.poster_path ? "hidden" : ""
                        } absolute p-2 text-white text-2xl`}
                    >
                        {data.title}
                    </h1>
                    <ListBulletIcon
                        className={`${
                            data.poster_path ? "hidden" : ""
                        } w-5 h-5 absolute top-4 text-white left-4 `}
                    />  
                    {data.position !== undefined ? (
                        <span className="absolute top-0 left-0 text-white" title={'Título número ' + data.position + ' más visto de la plataforma.'}>
                            <div className="w-12 h-12 rounded-tl-lg rounded-br-lg bg-white text-black text-2xl font-bold flex items-center justify-center">{data.position}</div>
                        </span>
                    ) : (
                        ""
                    )}
                    {data.isUserSubscribed !== undefined && !data.isUserSubscribed ? (
                        <span className="absolute top-0 right-0 text-white" title="No está disponible en sus servicios.">
                            <NoSymbolIcon className="w-12 h-12" />
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </Link>
        </>
    );
});

export default TitleCard;
