import { Link } from "@inertiajs/react";
import { ListBulletIcon } from "@heroicons/react/24/solid"; 
import { useState } from "react";

export default function TitleCard({ data, className="" }) {
    const ruta = (data.type) ? 'title.show' : 'playlist.show';
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = () => {
        setIsLoading(false);
    }

    return (
        <>
            <Link href={route(ruta, {'id': data.id})}>
                <div className="relative flex justify-center items-center border-2 border-transparent hover:border-white rounded-lg cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300">
                    <img
                        className={' rounded-lg ' + className}
                        src={data.poster_path ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path : '/img/zinc900-900x600.png'}
                        alt={data.title + ' '}
                        style={{ display: isLoading ? "none" : "block" }}
                        onLoad={loadHandler}
                    /> 
                    <img
                        className={' rounded-lg animate-pulse' + className}
                        style={{ display: isLoading ? "block" : "none" }}
                        src='/img/zinc900-900x600.png'
                        alt={data.title + ' '}
                    />
                    <h1 className={`${data.poster_path ? 'hidden' : ''} absolute p-2 text-white text-2xl`}>{data.title}</h1>
                    <ListBulletIcon className={`${data.poster_path ? 'hidden' : ''} w-5 h-5 absolute top-4 text-white left-4 `} />
                </div>
            </Link>
        </>
    );
}