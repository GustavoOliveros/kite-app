import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import toast from "react-hot-toast";
import ReviewBox from "./ReviewBox";

export default function Reviews({ reviews, titleId, rating, rating_amount }) {
    const { data, setData } = useForm({
        star_number: 0,
        review_text: "",
        title_id: titleId,
    });
    const [reviewsAux, setReviewsAux] = useState(reviews.allReviews ?? []);
    const [selectedStar, setSelectedStar] = useState(null);
    const [hoveredStar, setHoveredStar] = useState(null);

    const setStarNumber = (number) => {
        setData("star_number", number);
        setSelectedStar(number);
    };

    const callback = (response) => {
        if (response.data.type === "success") {
            setSelectedStar(0);
            setData({
                star_number: 0,
                review_text: "",
            });
            toast.success(response.data.message);
            fetchData();
        } else {
            toast.error(response.data.message);
            console.error(response);
        }
    };

    const saveReview = () => {
        const toastLoading = toast.loading("Procesando...");

        return axios
            .post(route("review.store", data))
            .then((response) => {
                toast.dismiss(toastLoading);
                callback(response);
            })
            .catch((error) => {
                toast.dismiss(toastLoading);
                toast.error("Ocurrió un error. Inténtelo de nuevo más tarde.");
                console.log(error);
            });
    };

    const fetchData = () => {
        return axios
            .get(route("getReviews", { titleId: titleId }))
            .then((response) => {
                setReviewsAux(response.data.allReviews);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        saveReview();
    };

    return (
        <>
            <div className="md:grid grid-cols-2 gap-6">
                <div className="bg-black/50 rounded-lg p-5 mb-5">
                    

                    {[1, 2, 3, 4, 5].map((starNumber) => (
                        <StarIcon
                            key={starNumber}
                            className={`w-10 h-10 inline-flex cursor-pointer ${
                                (hoveredStar && starNumber <= hoveredStar) ||
                                starNumber <= selectedStar
                                    ? "text-skyblue"
                                    : "text-white"
                            }`}
                            onClick={() => setStarNumber(starNumber)}
                            onMouseEnter={() => setHoveredStar(starNumber)}
                            onMouseLeave={() => setHoveredStar(null)}
                        />
                    ))}
                    <form onSubmit={submitHandler}>
                        <textarea
                            name="review_text"
                            id="review_text"
                            className="text-black w-full rounded-lg my-2"
                            cols="30"
                            rows="10"
                            maxLength="10000"
                            onChange={(e) =>
                                setData("review_text", e.target.value)
                            }
                            value={data.review_text}
                        />
                        <button
                            type="submit"
                            className={`inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                                !selectedStar ? "bg-gray-400 text-gray-800" : ""
                            }`}
                            disabled={!selectedStar}
                        >
                            Guardar
                        </button>
                    </form>
                </div>
                <div className="bg-black/50 rounded-lg md:p-5 p-2 mb-5 justify-center items-center">
                    <h2 className="text-6xl text-center">
                        {rating ?? 'N/A'} <StarIcon className="w-14 h-14 inline-flex pb-2" /> <span className="text-sm text-gray-400 block mb-2">{rating_amount} opiniones</span>{" "}
                    </h2>
                    <div className="h-[20rem] overflow-y-auto" id="reviews">
                        {reviewsAux &&
                            reviewsAux.map((element, index) => (
                                <ReviewBox review={element} key={index} />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
