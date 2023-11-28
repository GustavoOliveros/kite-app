import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SearchResults from "../Search/partials/SearchResults";

export default function Service({ auth, service, titles }) {
    return (
        <>
            <Head title={"Novedades en " + service.name} />
            <Authenticated user={auth.user} permissions={auth.permissions}>
                <div className="flex flex-col md:flex-row justify-center items-center gap-5 h-[40vh] rounded-lg mb-5 ">
                    <img src={service.logo_path} alt={service.name} />
                </div>
                <h2 className="text-lg text-white ps-6">Novedades</h2>
                <SearchResults data={titles} />
            </Authenticated>
        </>
    );
}
