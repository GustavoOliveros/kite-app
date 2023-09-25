import TitleCard from "./TitleCard";
import TitleInfo from "./TitleInfo";

export default function MobileSearchResult({ data }) {
    return (
        <>
            <div className="flex gap-3 py-1">
                    <div className="w-20 flex-shrink-0">
                        <TitleCard data={data} />
                    </div>
                    <TitleInfo data={data} />
            </div>
        </>
    );
}
