export default function TitleHeader({title}) {
    return (
        <h1 className="text-3xl my-4 text-center md:text-start">
            {title.title}{" "}
            <span className="text-sm text-gray-300">({title.year})</span>
        </h1>
    );
}
