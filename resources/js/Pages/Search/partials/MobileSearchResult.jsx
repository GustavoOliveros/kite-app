import TitleInfo from "@/Components/TitleInfo";
import { Link } from "@inertiajs/react";

export default function MobileSearchResult({ data }) {
    return (
        <>
            <Link href={route('title.show',{'id': data.id})}>
                <div className="flex gap-3 py-1">
                        <div className="w-20 flex-shrink-0">
                            <div>
                                <img className='rounded-lg cursor-pointer hover:opacity-50'
                                    src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + data.poster_path}
                                    alt={data.title + ' (' + data.year + ')'} />
                            </div>
                        </div>
                        <TitleInfo data={data} />
                </div>
            </Link>
        </>
        
    );
}
