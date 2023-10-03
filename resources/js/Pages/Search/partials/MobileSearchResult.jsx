import TitleCard from "@/Components/TitleCard";
import TitleInfo from "@/Components/TitleInfo";
import { Link } from "@inertiajs/react";

export default function MobileSearchResult({ data }) {
    return (
        <>
            <Link href={route('title.show',{'id': data.id})}>
                <div className="flex gap-3 py-1">
                        <div className="w-20 flex-shrink-0">
                            <TitleCard data={data} />
                        </div>
                        <TitleInfo data={data} />
                </div>
            </Link>
        </>
        
    );
}
