import { Head, useForm } from '@inertiajs/react';
import Choice from '@/Layouts/ChoiceLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import CheckboxChoice from './partials/CheckboxChoiceInput';
import { useState } from 'react';

export default function ServiceChoice({ auth, serviceData, errors }) {
    const [selectedValues, setSelectedValues] = useState([]);

    const { data, setData, post } = useForm({
        services: [],
    });

    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }

        setData('services', [...selectedValues, value]);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('services-selection'));
    };

    return (
        <>
        {console.log(errors)}
            <Head title="Servicios de Streaming" />
            <Choice user={auth.user} title={"¡Bienvenido, " + auth.user.username + "! Por favor, indique sus servicios de streaming contratados."}>
                <form onSubmit={submit}>
                <p className="text-white text-center bg-red-500 my-5">{errors[0]}</p>
                    <div className="flex flex-col">
                        <div className="mt-10 mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:mx-20">
                                    {serviceData && serviceData.length > 0 ? (
                                        serviceData.map((element, index) =>
                                            <CheckboxChoice
                                                key={index}
                                                data={element}
                                                name="services[]"
                                                onChange={handleCheckboxChange}
                                                selectedValues={selectedValues}
                                            />
                                        )
                                    ) : (
                                        <p className="text-white">Ocurrió un error. Vuelva más tarde.</p>
                                    )}
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-end md:mx-20 my-4">
                            <PrimaryButton disabled={selectedValues.length === 0}>Finalizar Registro</PrimaryButton>
                        </div>
                    </div>
                </form>
            </Choice>
        </>
    );
}
