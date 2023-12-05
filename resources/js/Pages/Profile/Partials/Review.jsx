import {
    EyeIcon,
    PencilIcon,
    StarIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function Review({ review }) {
    const dateString = review.created_at;
    const suggestionDate = new Date(dateString);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("es-AR", options).format(
        suggestionDate
    );

    return (
        <>
            <div className="relative py-6 px-5 text-start text-md rounded-lg w-full bg-gray-800 border-s-8 text-white">
                <h1 className="font-bold">
                    <Link
                        href={route("title.show", { id: review.title.id })}
                        className="underline"
                    >
                        {review.title.title}
                    </Link>{" "}
                    - {review.star_number}{" "}
                    <StarIcon className="w-5 h-5 pb-1 inline-flex" />
                </h1>
                <p>{review.review_text}</p>
                <p className="text-sm text-gray-400">{formattedDate}</p>
                <div className=" md:absolute top-4 right-4 flex gap-4 mt-4 justify-center">
                    <PencilIcon className="w-8 h-8 " />
                    <TrashIcon className="w-8 h-8" />
                </div>
            </div>
        </>
    );
}
