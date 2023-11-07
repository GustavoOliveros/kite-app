export default function TitleHeader({title, flag}) {
    return (
        <>
        <h1 className="text-3xl my-4 md:mt-0 md:mb-4 text-center md:text-start">
            {title.title}{" "}
            <div className="inline-flex justify-center items-center">
                <span className="text-sm text-gray-300">({title.year})</span>
                {flag && flag !== "" ? <img className="w-4 inline mx-2" src={flag} alt={"País de Origen: " + title.origin_country} /> : ''}
            </div>
        </h1>
        
        </>
    );
}
