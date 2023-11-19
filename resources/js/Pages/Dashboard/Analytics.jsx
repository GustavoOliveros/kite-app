import Dashboard from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AnalyticsStepper from "./partials/AnalyticsStepper";
import { useState } from "react";
import AnalyticsForm from "./partials/AnalyticsForm";
import { Spinner } from "@material-tailwind/react";
import AnalyticsResult from "./partials/AnalyticsResult";

export default function Analytics({ auth }) {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [data, setData] = useState([]);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const reset = () => setActiveStep(0);

    return (
        <>
            <Head title="Generar Reporte" />
            <Dashboard title="Generar Reporte">
                <AnalyticsStepper activeStep={activeStep} />
                {activeStep === 0 ? (
                    <AnalyticsForm handleNext={handleNext} setData={setData} />
                ) : (
                    ""
                )}
                {activeStep === 1 ? (
                    <div className="flex items-center justify-center space-x-2 py-4">
                        <Spinner className="w-5 h-5" />
                        <h3 className="text-3xl text-center">Procesando...</h3>
                    </div>
                ) : (
                    ""
                )}
                {activeStep === 2 ? <AnalyticsResult data={data} reset={reset} /> : ""}
            </Dashboard>
        </>
    );
}
