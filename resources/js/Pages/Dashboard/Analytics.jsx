import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AnalyticsStepper from "./partials/AnalyticsStepper";

export default function Analytics({ auth }) {
    const mediaTypeOptions = [
        { value: "movies", label: "Películas" },
        { value: "tv", label: "Series" },
        { value: "show", label: "Películas y series" },
        { value: "services", label: "Servicios" },
    ];

    const typeOptions = [
        { value: "mostviewed", label: "Más vistos" },
        { value: "mostreviewed", label: "Más calificados" },
    ];

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Head title="Generar Reporte" />
            <Dashboard title="Generar Reporte">
            <AnalyticsStepper />

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
                            isClearable={true}
                            placeholder="Seleccione uno..."
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
                            placeholder="Seleccione uno..."
                            noOptionsMessage={() => {
                                return "No se encontraron coincidencias...";
                            }}
                        />
                    </div>
                    </div>
                    <PrimaryButton type="submit" className="mt-4">Generar</PrimaryButton>
                </form>
            </Dashboard>
        </>
    );
}
