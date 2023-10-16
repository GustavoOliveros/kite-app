import TitleCard from "@/Components/TitleCard";
import MobileSearchResult from "./MobileSearchResult";


export default function SearchResults({ data, showNoResults }) {
    return (
        <>
            <div className="hidden md:grid grid-cols-5 gap-5 py-3 pb-6">
                {data && data.length > 0 ? (
                    data.map((element, index) => <TitleCard data={element} key={index} />)
                ) : (
                    showNoResults && <p className="text-white">No se encontraron resultados...</p>
                )}
            </div>

            {/* <div className="flex flex-col block md:hidden p-3 pb-6">
                {data.length > 0 ? (
                    data.map((element, index) => <MobileSearchResult data={element} key={index} />)
                ) : (
                    showNoResults && <p className="text-white">No se encontraron resultados...</p>
                )}
            </div> */}
        </>
    );
}
