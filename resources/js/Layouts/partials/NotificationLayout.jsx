import { Link, usePage } from "@inertiajs/react";
import { BellIcon, BellAlertIcon } from "@heroicons/react/24/solid";

export default function NotificationLayout({}) {
    const { unreadNotifications } = usePage().props;

    return (
        <Link
            className="text-white "
            href={route("notifications")}
            title="Notificaciones"
        >
            {unreadNotifications > 0 ? (
                <div className="flex gap-2 items-center bg-skyblue rounded-full px-2 py-1">
                    <BellAlertIcon className="w-5 h-5 " />
                    {/* <span className=" bg-skyblue text-white rounded-full scale-75 p-1 absolute top-0 px-2 -translate-y-3 translate-x-2 right-0 text-xs">2</span> */}
                    <span>{unreadNotifications}</span>
                </div>
            ) : (
                <BellIcon className="w-5 h-5" />
            )}
        </Link>
    );
}
