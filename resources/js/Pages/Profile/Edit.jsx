import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import UpdateUsernameForm from "./Partials/UpdateUsernameForm";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
    UserCircleIcon,
    ClockIcon,
    ListBulletIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
            >
                <Head title="Profile" />

                <div className="md:flex md:space-x-6 pt-5">
                    <div className="rounded-lg ">
                        <div className="me-0 md:me-6 space-y-6 md:sticky md:top-20 w-full">
                            <div className="bg-white rounded-lg text-center p-5 mb-6 md:mb-0">
                                <UserCircleIcon className="w-40 h-40 mx-auto" />
                                <p>{auth.user.username}</p>
                                <p className="text-gray-500">
                                    {auth.user.email}
                                </p>

                                
                            </div>
                            <List className="p-0 space-y-2 flex">
                                <Link href={route('history')} className="bg-white rounded-lg">
                                    <ListItem className="hover:bg-gray-300">
                                        <ListItemPrefix>
                                            <ClockIcon className="h-5 w-5 pe-2" />
                                        </ListItemPrefix>
                                        Historial
                                    </ListItem>
                                </Link>
                                <Link href="#" className="bg-white rounded-lg">
                                    <ListItem className="hover:bg-gray-300">
                                        <ListItemPrefix>
                                            <ListBulletIcon className="h-5 w-5 pe-2" />
                                        </ListItemPrefix>
                                        Sugerencias
                                    </ListItem>
                                </Link>
                                <Link href={route('logout')} className="bg-white rounded-lg">
                                    <ListItem className="hover:bg-gray-300 text-red-800">
                                        <ListItemPrefix>
                                            <ArrowLeftOnRectangleIcon className="h-5 w-5 pe-2" />
                                        </ListItemPrefix>
                                        Cerrar sesión
                                    </ListItem>
                                </Link>
                            </List>
                        </div>
                    </div>
                    <div className="space-y-6 mt-6 md:mt-0 w-full">
                        <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                            <UpdateUsernameForm className="max-w-xl" />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Toaster />
        </>
    );
}
