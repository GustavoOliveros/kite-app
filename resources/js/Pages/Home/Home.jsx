import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SelectService from "./partials/SelectService";
import SearchResults from "../Search/partials/SearchResults";
import { CarouselHome } from "./partials/CarouselHome";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import TitleList from "./partials/TitleList";
import ServiceHome from "./partials/ServiceHome";
import TitleLists from "./partials/TitleLists";

export default function Home({ auth, services, lists }) {

    const [data, setData] = useState(lists);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        return axios.get(route('loadMoreTitles', {page:page}))
            .then((response) => {
                setData((prevData) => [...prevData, ...response.data]);
                setPage((prevPage) => prevPage + 1);

                if(response.data.length < 20){
                    setHasMore(false);
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <Head title="Home" />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
            >
                {/* <h1 className="text-2xl text-white text-center mt-8">¡Bienvenid@, {auth.user.username}!<br />¿Qué deseas ver?</h1> */}
                <div className="md:pt-5">
                    {/* <CarouselHome titles={titles} /> */}
                </div>

                <div className="flex-wrap justify-center my-10 hidden md:flex px-6">
                    {services && services.length > 0 ? (
                        services.map((element, index) => (
                            <ServiceHome key={index} service={element} />
                        ))
                    ) : (
                        <p className="text-white"></p>
                    )}
                </div>

                {console.log(lists)}

                <TitleLists data={data} />


                {/* <InfiniteScroll className="!overflow-visible" next={fetchData} dataLength={data.length} loader={<Spinner className="w-10 h-10 mx-auto my-10" />} hasMore={hasMore}>
                    <SearchResults data={data}  showNoResults={false} />
                </InfiniteScroll> */}
            </AuthenticatedLayout>
        </>
    );
}
