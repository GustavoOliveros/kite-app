import { Carousel } from "@material-tailwind/react";
import { Link } from "@inertiajs/react";

export function CarouselHome({}) {
    return (
        <>
            <Carousel
                className="rounded-xl aspect-video md:aspect-[95/26] z-0 "
                loop={true}
                autoplay={true}
                autoplayDelay={8000}
            >
                <Link href={route('title.show', {id:14})}>
                    <img
                        src="https://www.gran-turismo.com/images/c/i13ynTpBw8HAmb.jpg"
                        alt="Gran Turismo"
                        className="h-full w-full object-cover"
                    />
                </Link>
                <Link href={route('title.show', {id:33})}>
                    <img
                        src="https://ponpausa.files.wordpress.com/2018/09/greys-15-poster-horizontal-e1538096228615.jpg"
                        alt="Anatomía de Grey"
                        className="h-full w-full object-cover"
                    />
                </Link>
                <Link href={route('title.show', {id:33})}>
                    <img
                        src="https://ponpausa.files.wordpress.com/2018/09/greys-15-poster-horizontal-e1538096228615.jpg"
                        alt="Anatomía de Grey"
                        className="h-full w-full object-cover"
                    />
                </Link>
                <Link href={route('title.show', {id:33})}>
                    <img
                        src="https://ponpausa.files.wordpress.com/2018/09/greys-15-poster-horizontal-e1538096228615.jpg"
                        alt="Anatomía de Grey"
                        className="h-full w-full object-cover"
                    />
                </Link>
                <Link href={route('title.show', {id:33})}>
                    <img
                        src="https://ponpausa.files.wordpress.com/2018/09/greys-15-poster-horizontal-e1538096228615.jpg"
                        alt="Anatomía de Grey"
                        className="h-full w-full object-cover"
                    />
                </Link>
            </Carousel>
        </>
    );
}
