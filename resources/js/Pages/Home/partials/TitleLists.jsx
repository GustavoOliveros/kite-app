import TitleList from "./TitleList";
import { memo } from "react";

const TitleLists = memo(({ data }) => {
    return (
        <>
            <div className="">
                {data && data.length > 0
                    ? data.map((element, index) => (
                          <TitleList data={element} key={element.id} />
                      ))
                    : ''}
            </div>

            {/* <div className="flex flex-col md:hidden p-3 pb-6">
                {data.length > 0 ? (
                    data.map((element, index) => <MobileSearchResult data={element} key={index} />)
                ) : (
                    showNoResults && <p className="text-white">No se encontraron resultados...</p>
                )}
            </div> */}
        </>
    );
});

export default TitleLists;
