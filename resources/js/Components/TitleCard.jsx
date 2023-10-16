import { Link } from "@inertiajs/react";

export default function TitleCard({ data, className="" }) {
    return (
        <>
            <Link href={route('title.show',{'id': data.id})}>
                <div className="relative flex justify-center items-center border-2 border-transparent hover:border-white rounded-lg cursor-pointer transition ease-in-out delay-150 hover:scale-110 duration-300">
                    <img className={' rounded-lg ' + className}
                        src={data.poster_path ? "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path : '/img/zinc900-900x600.png'}
                        alt={data.title + ' '} />
                    <h1 className={`${data.poster_path ? 'hidden' : ''} absolute p-2 text-white text-2xl`}>{data.title}</h1>
                </div>
            </Link>
        </>
    );
}