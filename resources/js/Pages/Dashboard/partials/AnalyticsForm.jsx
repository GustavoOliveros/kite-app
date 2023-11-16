import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function AnalyticsForm({handleNext}) {
    const [mediaType, setMediaType] = useState(null);
    const [type, setType] = useState([]);
    
    const mediaTypeOptions = [
        { value: "movies", label: "Películas" },
        { value: "tv", label: "Series" },
        { value: "show", label: "Películas y series" },
        { value: "services", label: "Servicios (más vistos)" },
    ];

    const typeOptions = [
        { value: "mostviewed", label: "Más vistas" },
        { value: "mostreviewed", label: "Más calificadas" },
        { value: "bestreviewed", label: "Mejor calificadas" },
    ];

    const perform = () => {
        return axios
            .post(route('analytics.perform', {mediaType: mediaType, type: type}))
            .then((response) => {
                handleNext();
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        handleNext();

        perform();
    };
    return (
        <div className="w-full py-4 px-8">
            <form onSubmit={submitHandler}>
                <div className="md:grid md:grid-cols-2 md:space-x-2">
                    <div className="text-black">
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="mediaType"
                            value="Tipo de contenido"
                        />
                        <Select
                            options={mediaTypeOptions}
                            name="mediaType"
                            id="mediaType"
                            on
                            isClearable={true}
                            placeholder="Seleccione uno..."
                            onChange={setMediaType}
                            noOptionsMessage={() => {
                                return "No se encontraron coincidencias...";
                            }}
                        />
                    </div>
                    <div className="text-black ">
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="type"
                            value="Tipo de solicitud"
                        />
                        <Select
                            options={typeOptions}
                            name="type"
                            id="type"
                            isClearable={true}
                            isDisabled={!(mediaType && mediaType.value !== 'services')}
                            onChange={setType}
                            placeholder="Seleccione uno..."
                            noOptionsMessage={() => {
                                return "No se encontraron coincidencias...";
                            }}
                        />
                    </div>
                </div>
                <PrimaryButton type="submit" className="mt-4" disabled={!mediaType}>
                    Generar
                </PrimaryButton>
            </form>
        </div>
    );
}
