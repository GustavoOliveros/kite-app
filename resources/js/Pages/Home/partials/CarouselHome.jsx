import { Carousel } from "@material-tailwind/react";

export function CarouselHome({ titles }) {
    return (
        <>
            <Carousel className="rounded-xl aspect-[95/26] z-0 " loop={true} autoplay={true}>
                <img
                    src={
                        "https://image.tmdb.org/t/p/w1280_and_h720_bestv2" +
                        titles[0].backdrop_path
                    }
                    alt={titles[0].title}
                    className="h-full w-full object-cover"
                />
                <img
                    src={
                        "https://image.tmdb.org/t/p/w1280_and_h720_bestv2" +
                        titles[1].backdrop_path
                    }
                    alt={titles[1].title}
                    className="h-full w-full object-cover"
                />
                <img
                    src={
                        "https://image.tmdb.org/t/p/w1280_and_h720_bestv2" +
                        titles[2].backdrop_path
                    }
                    alt={titles[2].title}
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </>
    );
}
