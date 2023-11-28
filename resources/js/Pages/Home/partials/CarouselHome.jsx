import { Carousel } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";

export function CarouselHome({ titles }) {
    return (
        <>
            <Carousel
                className="rounded-xl aspect-video md:aspect-[95/26] z-0 "
                loop={true}
                autoplay={true}
                autoplayDelay={8000}
            >
                {[0, 1, 2, 3, 4].map((element) => (
                    <Link href={route("title.show", { id: titles[element].id })} title={titles[element].title} className="relative">
                        <img
                            src={"https://image.tmdb.org/t/p/w1280_and_h720_bestv2" + titles[element].backdrop_path}
                            alt={titles[element].title}
                            className="h-full w-full object-cover"
                        />
                        <span className="absolute hidden md:block bottom-10 left-0 bg-white text-black rounded-e-lg py-2 ps-20 pe-2 font-extrabold text-shadow text-2xl">{titles[element].title}</span>
                    </Link>
                ))}
            </Carousel>
        </>
    );
}
