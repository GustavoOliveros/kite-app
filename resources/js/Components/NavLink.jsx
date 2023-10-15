import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? ' text-gray-900    '
                    : 'border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            <div className={
                'border-b-2 ' +
                (active
                    ? 'border-white '
                    : 'border-transparent text-gray-500  hover:text-gray-400 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }>
                {children}
            </div>
        </Link>
    );
}
