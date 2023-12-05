import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Review from "./Partials/Review";

export default function Reviews({ auth, reviews }) {
    return (
        <>
            <Head title="Sus reseñas" />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <h1 className="text-4xl text-white text-center mb-10 mt-3">
                    Reseñas
                </h1>

                <div className="space-y-4  text-white md:max-w-[50%] px-2 md:px-0 mx-auto">
                    {reviews &&
                        reviews.map((element, index) => (
                            <Review review={element} key={index} />
                        ))}
                </div>
            </Authenticated>
        </>
    );
}
