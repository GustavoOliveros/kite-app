import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Suggestion from "./Partials/Suggestion";

export default function Suggestions({ auth, suggestions }) {
    return (
        <>
            <Head title="Sus sugerencias" />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <h1 className="text-4xl text-white text-center mb-10 mt-3">Sugerencias</h1>

                <div className="space-y-4  text-white md:max-w-[50%] px-2 md:px-0 mx-auto">
                    {suggestions &&
                        suggestions.map((element, index) => (
                            <Suggestion suggestion={element} />
                        ))}
                </div>
            </Authenticated>
        </>
    );
}
