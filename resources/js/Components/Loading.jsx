export default function Loading({ amount = 5 }) {
    return (
        <div className="grid grid-cols-5 gap-5 py-3 pb-6">
            {[...Array(amount)].map((elementInArray, index) => (
                <img src="/img/zinc900-900x600.png" className="text-white animate-pulse bg-gray-500 rounded-lg" key={index} />
            ))}
        </div>
    );
}
