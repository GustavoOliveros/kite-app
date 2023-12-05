import { Carousel } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";
import { useState, useCallback, memo } from "react";

const CarouselHome = memo(({ titles }) => {
    const [isLoading, setIsLoading] = useState(true);

    const loadHandler = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            <Carousel
                className="rounded-xl aspect-video md:aspect-[95/26] z-0 "
                loop={true}
                autoplay={true}
                autoplayDelay={8000}
            >
                {[0, 1, 2, 3, 4].map((element) => (
                    <Link
                        href={route("title.show", { id: titles[element].id })}
                        title={titles[element].title}
                        className=" "
                        key={element}
                    >
                        <div
                            className="relative h-full w-full object-cover"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w1280_and_h720_bestv2${titles[element].backdrop_path})`,
                                position: "relative", // Ensure the positioning context for absolute children
                            }}
                        >
                            <div className="backdrop-blur-3xl w-full h-full absolute inset-0"></div>
                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w1280_and_h720_bestv2" +
                                    titles[element].backdrop_path
                                }
                                alt={titles[element].title}
                                className="md:w-[50%] h-full mx-auto relative z-10" // Use z-10 to position above the blurred div
                                onLoad={loadHandler}
                                style={{
                                    display: isLoading ? "none" : "block",
                                }}
                            />
                            <div
                                className="bg-zinc-800 w-full h-full object-cover animate-pulse absolute inset-0"
                                style={{
                                    display: isLoading ? "block" : "none",
                                }}
                            ></div>
                            <span className="absolute hidden md:block bottom-10 z-10 left-0 bg-white text-black rounded-e-lg py-2 ps-20 pe-2 font-extrabold text-shadow text-2xl">
                                {titles[element].title}
                            </span>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </>
    );
});

export default CarouselHome;
