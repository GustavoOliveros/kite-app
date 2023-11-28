import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CarouselHome } from "./partials/CarouselHome";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import ServiceHome from "./partials/ServiceHome";
import TitleLists from "./partials/TitleLists";

export default function Home({ auth, services, lists, hasMoreDB}) {

    const [data, setData] = useState(lists);
    const [page, setPage] = useState(1);
    const [userPage, setUserPage] = useState(1);

    const [hasMoreUser, setHasMoreUser] = useState(hasMoreDB);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        if(hasMoreUser){
            return axios.get(route('loadMoreUserGenres', {page: userPage}))
                .then((response) => {
                    console.log(response.data)
                    setData((prevData) => [...prevData, ...response.data.data]);
                    setUserPage(response.data.page);
                    setHasMoreUser(response.data.hasMore);
                })
                .catch((error) => console.error(error));
        }

        return axios.get(route('loadMoreGenres', {page:page}))
            .then((response) => {
                console.log(response.data)
                setData((prevData) => [...prevData, ...response.data.data]);
                setPage(response.data.page);
                setHasMore(response.data.hasMore);
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
                    <CarouselHome titles={lists[0].titles}  />
                </div>

                <div className="justify-center md:my-10 grid grid-cols-3 py-5 mt-5 px-2 md:py-0 gap-3 md:flex md:px-6">
                    {services && services.length > 0 ? (
                        services.map((element, index) => (
                            <ServiceHome key={index} service={element} />
                        ))
                    ) : (
                        <p className="text-white"></p>
                    )}
                </div>

                <InfiniteScroll className="!overflow-visible" next={fetchData} dataLength={data.length} loader={<Spinner className="w-10 h-10 mx-auto my-10" />} hasMore={hasMore}>
                    <TitleLists data={data} />
                </InfiniteScroll>
            </AuthenticatedLayout>
        </>
    );
}
