import { StarIcon } from "@heroicons/react/24/solid";

export default function TitleHeader({ title, flag }) {
    return (
        <>
            <a
                href="#reviews"
            >
                <div className="flex mt-4 md:mt-0 items-center gap-1 text-sm md:justify-start justify-center">
                    {[...Array(5)].map((_, index) => (
                        <StarIcon
                            key={index}
                            className={
                                index < title.rating
                                    ? "text-skyblue w-5 h-5"
                                    : "text-gray-300 w-5 h-5"
                            } // Adjust classes based on your styling
                        />
                    ))}
                    ({title.rating_amount})
                </div>
            </a>
            <h1 className="text-3xl md:text-4xl md:my-4 md:mt-0 md:mb-4 text-center md:text-start">
                {title.title}{" "}
                <div className="  md:inline-flex justify-center items-center">
                    <span className="text-sm text-gray-300">
                        ({title.year})
                    </span>
                    {flag && flag !== "" ? (
                        <img
                            className="w-4 inline mx-2"
                            src={flag}
                            alt={"País de Origen: " + title.origin_country}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </h1>
        </>
    );
}
