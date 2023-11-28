import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import toast from "react-hot-toast";

export default function AnalyticsForm({ handleNext, setData, setActiveStep }) {
    const [mediaType, setMediaType] = useState(null);
    const [type, setType] = useState(null);
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]);
    const [dateUntil, setDateUntil] = useState(new Date().toISOString().split('T')[0]);

    const mediaTypeOptions = [
        { value: "movie", label: "Películas" },
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
            .post(
                route("analytics.perform", { mediaType: mediaType, type: type, dateFrom: dateFrom, dateUntil: dateUntil })
            )
            .then((response) => {
                setData(response.data);
                handleNext();
                
            })
            .catch((error) => {
                setActiveStep(0);
                toast.error('Ocurrió un error. Inténtelo de nuevo más tarde.');
                console.log(error);
            });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        handleNext();

        perform();
    };
    return (
        <div className="w-full py-4 md:px-8 px-1">
            <form onSubmit={submitHandler}>
                <div className="md:grid md:grid-cols-2 gap-2">
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
                            isDisabled={
                                !(mediaType && mediaType.value !== "services")
                            }
                            onChange={setType}
                            placeholder="Seleccione uno..."
                            noOptionsMessage={() => {
                                return "No se encontraron coincidencias...";
                            }}
                        />
                    </div>
                    <div className="text-black ">
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="dateFrom"
                            value="Desde"
                        />
                        <TextInput
                            name="dateFrom"
                            min="2023-01-01"
                            max={dateUntil}
                            value={dateFrom}
                            className="w-full"
                            type="date"
                            id="dateFrom"
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="text-black ">
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="dateUntil"
                            value="Hasta"
                        />
                        <TextInput
                            className="w-full"
                            name="dateUntil"
                            value={dateUntil}
                            min={dateFrom}
                            max={new Date().toISOString().split('T')[0]}    
                            type="date"
                            id="dateUntil"
                            onChange={(e) => setDateUntil(e.target.value)}
                        />
                    </div>
                </div>
                <PrimaryButton
                    type="submit"
                    className="mt-4"
                    disabled={!mediaType || (mediaType.value !== 'services' && !type) || !dateFrom || !dateUntil}
                >
                    Generar
                </PrimaryButton>
            </form>
        </div>
    );
}
