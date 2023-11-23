import useTitles from "@/Hooks/useTitles";
import { useState } from "react";

export default function EndlessScroll({}) {
    const [page, setPage] = useState(1);
    const [data, message, type] = useTitles(page);

    return (
        <>





            <div className="md:grid grid-cols-5 gap-5 py-3 pb-6 hidden">
                {[1, 2, 3, 4, 5].map((element, index) => (
                    <img
                        key={index}
                        className="rounded-lg animate-pulse brightness-200"
                        src="/img/zinc900-900x600.png"
                        alt=""
                    />
                ))}
            </div>
        </>
    );
}
