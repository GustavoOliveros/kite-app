import TitleInfo from "@/Components/TitleInfo";
import { Link } from "@inertiajs/react";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { useState, useCallback, memo } from "react";


const MobileSearchResult = memo(({ data }) => {
    const ruta = data.type ? "title.show" : "playlist.show";
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = useCallback(() => {
        setIsLoading(false);
    }, [])

    return (
        <>
            <Link href={route(ruta, { id: data.id })}>
                <div className="flex gap-3 py-1">
                    <div className="w-20 flex-shrink-0">
                        <div className="relative flex items-center justify-center">
                            <img 
                                    className='rounded-lg'
                                    src={data.poster_path ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path : '/img/zinc900-900x600.png'}
                                    alt={data.title + ' '}
                                    style={{display: isLoading ? "none" : "block" }}
                                    onLoad={loadHandler}
                                />
                            <img
                                className={
                                    " rounded-lg animate-pulse" 
                                }
                                style={{display: isLoading ? "block" : "none" }}
                                src="/img/zinc900-900x600.png"
                            />

                            <ListBulletIcon
                                className={`${
                                    data.poster_path ? "hidden" : ""
                                } w-8 h-8 absolute text-white z-20 `}
                            />
                        </div>
                    </div>
                    <TitleInfo data={data} />
                </div>
            </Link>
        </>
    );
});

export default MobileSearchResult;
