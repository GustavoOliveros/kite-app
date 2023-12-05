import axios from "axios";

export default function Notification({ reminder, isMarkedAsRead }) {
    const clickHandler = (reminderId) => {
        return axios
            .post(route("markAsRead", { id: reminderId }))
            .then((response) => {
                window.location.href = route("title.show", {
                    id: reminder.title.id,
                });
            });
    };

    return (
        <div
            className={`py-6 px-5 text-start text-md  rounded-lg  cursor-pointer w-full flex border-s-8 ${
                reminder.status === 3 || isMarkedAsRead
                    ? "bg-gray-700  border-white"
                    : "bg-gray-800 border-skyblue"
            }`}
            onClick={() => clickHandler(reminder.id)}
        >
            {reminder.type === "release" ? (
                <div className="">
                    «{reminder.title.title}» se ha estrenado.
                    <div className="text-sm text-gray-300">
                        {reminder.formatted_created_at}
                    </div>
                </div>
            ) : (
                ""
            )}
            {reminder.type === "service" ? (
                <div className="">
                    «{reminder.title.title}» ahora está disponible en{" "}
                    {reminder.service.name}.
                    <div className="text-sm text-gray-300">
                        {reminder.formatted_created_at}
                    </div>
                </div>
            ) : (
                ""
            )}

            {reminder.type === "suggestion" ? (
                <div className="">
                    El título que sugirió «{reminder.title.title}» fue aprobado
                    y ya está disponible en Kite.
                    <div className="text-sm text-gray-300">
                        {reminder.formatted_created_at}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
