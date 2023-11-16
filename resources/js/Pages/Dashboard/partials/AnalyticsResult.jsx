import PrimaryButton from "@/Components/PrimaryButton";

export default function AnalyticsResult() {
    return (
        <div className="w-full py-4 px-8 text-center">
            <h3 className="text-2xl ">Descargar Resultado</h3>
            <div className="flex gap-2 my-5 justify-center">
                <PrimaryButton>PDF</PrimaryButton>
                <PrimaryButton>Excel</PrimaryButton>
            </div>
            <div className="bg-white min-h-[50vh] rounded-lg text-black">pepe tiene 5 manzanas</div>
        </div>
    );
}
