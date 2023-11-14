import { StarIcon } from "@heroicons/react/24/solid";

export default function ReviewBox({ review }) {
    const dateString = review.created_at;
    const reviewDate = new Date(dateString);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("es-AR", options).format(
        reviewDate
    );

    return (
        <div className="bg-black/50 rounded-lg p-5 mb-5 flex flex-col gap-2">
            <div className="flex items-center gap-1">
                {review.star_number}
                <span className="text-sm">/5</span>
                <StarIcon className="w-5 h-5" />
            </div>
            <div>
                <strong>{review.username}</strong> -{" "}
                <span className="text-sm">{formattedDate}</span>
            </div>
            {review.review_text}
        </div>
    );
}
