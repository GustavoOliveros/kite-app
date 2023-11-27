export default function ServiceHome({ service }) {
    return (
        <a
            className="flex justify-center p-10 rounded-md font-semibold text-xs text-white uppercase  focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out delay-150 hover:scale-150 duration-300"
            disabled={false}
            href={service.homepage}
            target="_blank"
        >
            <img
                src={service.logo_path}
                className="w-20 h-20"
                alt={service.name}
            />
        </a>
    );
}
