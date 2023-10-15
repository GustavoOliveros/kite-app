import { Link } from "@inertiajs/react";

export default function TitleCard({ data, className="" }) {
    return (
        <>
            <Link href={route('title.show',{'id': data.id})}>
                <div>
                    <img className={'border-2 border-transparent hover:border-white rounded-lg cursor-pointer ' + className}
                        src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path}
                        alt={data.title + ' (' + data.year + ')'} />
                </div>
            </Link>
        </>
    );
}