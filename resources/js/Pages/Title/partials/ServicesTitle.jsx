export default function ServicesTitle({ services }) {
    return (
        <div className="flex flex-wrap gap-5 mb-20 justify-center md:justify-start">
            {services && services.length > 0 ? (
                services.map((element, index) => (
                    <img
                        key={index}
                        className="w-10"
                        src={element.service.logo_path}
                        alt={element.service.name}
                    />
                ))
            ) : (
                <p className="text-white">
                    No está disponible en ningún servicio de streaming.
                </p>
            )}
        </div>
    );
}