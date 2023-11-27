import { Carousel } from "@material-tailwind/react";
import { memo } from "react";
import TitleCard from "@/Components/TitleCard";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import IconButton from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";

const TitleList = memo(({ data }) => {
    const [columnLength, setColumnLength] = useState(0);

    useEffect(() => {
        if (data.titles != undefined) {
            setColumnLength(parseInt(data.titles.length / 5));
        }
    }, []);

    return (
        <div>
            <h2 className="text-lg text-white ps-6">{data.name}</h2>

            {columnLength <= 1 ? (
                <div className="flex space-x-5  px-5 justify-evenly items-center">
                    {data.titles.map((element, index) => (
                        <TitleCard data={element} key={index} />
                    ))}
                </div>
            ) : (
                ""
            )}

            {columnLength > 1 && (
                <Carousel
                    className="h-auto pb-6 pt-5"
                    loop={true}
                    navigation={() => <></>}
                >
                    {Array.from({ length: columnLength }).map((_, index) => (
                        // Render your content here for each iteration
                        <div
                            key={index}
                            className="flex object-cover space-x-5  px-5 justify-evenly items-center"
                        >
                            {data.titles
                                .slice(index * 5, (index + 1) * 5)
                                .map((element, titleIndex) => (
                                    <TitleCard
                                        key={titleIndex}
                                        data={element}
                                    />
                                ))}
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
});

export default TitleList;
