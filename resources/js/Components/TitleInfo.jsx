export default function TitleInfo({ data }) {
    return (
        <>
            <div className="text-white my-auto">
                <p className="font-bold">{data.title}</p>
                <p className="text-sm"><span className="bg-gray-700 p-1 rounded-md my-3">{data.year}</span></p>
            </div>
        </>
    );
}