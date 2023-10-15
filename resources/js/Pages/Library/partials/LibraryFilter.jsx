

export default function LibraryFilter({...props}) {


    return (
        <select
            name="libraryFilter"
            id="libraryFilter"
            className="text-white h-auto bg-zinc-900 rounded-lg focus:border-white focus:ring-white cursor-pointer"
            {...props}
        >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
        </select>
    );
}
