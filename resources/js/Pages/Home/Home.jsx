import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectService from "./partials/SelectService";
import SearchResults from "../Search/partials/SearchResults";
import { CarouselHome } from "./partials/CarouselHome";
import EndlessScroll from "./partials/EndlessScroll";

export default function Home({ auth, services, titles }) {
    return (
        <>
            <Head title="Home" />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
            >
                {/* <h1 className="text-2xl text-white text-center mt-8">¡Bienvenid@, {auth.user.username}!<br />¿Qué deseas ver?</h1> */}
                <div className="pt-5">
                    <CarouselHome titles={titles} />
                </div>

                <div className="flex-wrap justify-center my-10 hidden md:flex md:justify-between">
                    {services && services.length > 0 ? (
                        services.map((element, index) => (
                            <SelectService key={index} service={element} />
                        ))
                    ) : (
                        <p className="text-white"></p>
                    )}
                </div>

                <div>
                    <SearchResults data={titles} showNoResults={false} />
                </div>

                <EndlessScroll />
            </AuthenticatedLayout>
        </>
    );
}
