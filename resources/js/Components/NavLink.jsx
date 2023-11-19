import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? " text-gray-900    "
                    : "border-transparent text-gray-500 hover:border-gray-300 focus:text-white focus:border-gray-300 ") +
                className
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col relative">
                <div className="flex mb-2">{children}</div>
                <div
                    className={`absolute bottom-0  bg-white h-[0.15rem] mt-1 rounded-lg transition-all duration-500  ${
                        active || isHovered ? "w-full" : "w-0"
                    }`}
                ></div>
            </div>
        </Link>
    );
}
