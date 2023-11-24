import DeletableTitleCard from "./DeletableTitleCard";

/**
 * To use this component, the server must return a variable named "deleteRoute" (string) with the route to the delete method.
 */
export default function DeletableTitleList({ data, isDeletable, fetchData }) {
    return (
        <>
            <div className="hidden md:grid grid-cols-5 gap-5 py-3 pb-6">
                {data && data.length > 0 && (
                    data.map((element, index) => <DeletableTitleCard data={element} fetchData={fetchData} key={index} isDeletable={isDeletable} />)
                )}
            </div>


            {/* <div className="flex flex-col md:hidden p-3 pb-6">
                {data && data.length > 0 && (
                    data.map((element, index) => <MobileSearchResult data={element} key={index} />)
                )}
            </div> */}
        </>
    );
}
