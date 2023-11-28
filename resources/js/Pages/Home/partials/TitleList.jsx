import { Carousel } from "@material-tailwind/react";
import { memo } from "react";
import TitleCard from "@/Components/TitleCard";
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
        <div className="mt-3 md:mt-0">
            <h2 className="text-lg text-white ps-6">{data.name}</h2>

            {columnLength <= 1 ? (
                <div className="md:grid grid-cols-5 gap-5 pt-5 pb-6 px-5 justify-evenly items-center hidden">
                    {data.titles.slice(0, 5).map((element, index) => (
                        <TitleCard data={element} key={index} />
                    ))}
                </div>
            ) : (
                ""
            )}

            {columnLength > 1 && (
                <Carousel
                    className="h-auto pb-6 pt-5 md:flex hidden"
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

            <div className="flex md:hidden space-x-3 overflow-x-auto w-[100vw] my-3  px-2 snap-mandatory snap-x">
                {data.titles !== undefined && data.titles.map((element, index) => (
                    <TitleCard data={element} key={index} className="min-w-[40vw] max-w-[40vw] snap-center" />
                ))}
            </div>
        </div>
    );
});

export default TitleList;
