import InputLabel from "@/Components/InputLabel";
import Checkbox_Choice from "@/Components/CheckboxChoiceInput";

export default function Select_Service({ data }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:mx-20">
                {data && data.length > 0 ? (
                    data.map((element, index) => <Checkbox_Choice key={index} data={element} />)
                ) : (
                    <p className="text-white">Ocurrió un error. Vuelva más tarde.</p>
                )}
                
                
            </div>
        </>
    );
}
