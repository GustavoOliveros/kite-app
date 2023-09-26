import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Choice({ auth, children, title }) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-zinc-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>
            <div>
                <h1 className="text-white text-lg mt-5 mx-3 md:mx-0">{title}</h1>
            </div>

            <div className="w-full flex justify-center">
                {children}
            </div>
        </div>
    );
}
