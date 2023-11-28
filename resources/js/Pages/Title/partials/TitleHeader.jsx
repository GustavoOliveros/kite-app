import { StarIcon } from "@heroicons/react/24/solid";

export default function TitleHeader({title, flag}) {
    return (
        <>
        <div className="flex mt-4 md:mt-0 items-center gap-1 text-sm md:justify-start justify-center">
            {title.rating ?? 'N/A'} <StarIcon className="w-5 h-5" />
            ({title.rating_amount})
        </div>
        <h1 className="text-3xl md:text-4xl md:my-4 md:mt-0 md:mb-4 text-center md:text-start">
            {title.title}{" "}
            <div className="  md:inline-flex justify-center items-center">
                <span className="text-sm text-gray-300">({title.year})</span>
                {flag && flag !== "" ? <img className="w-4 inline mx-2" src={flag} alt={"País de Origen: " + title.origin_country} /> : ''}
            </div>
        </h1>
        
        </>
    );
}
