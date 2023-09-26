import { Link, Head } from '@inertiajs/react';
import Choice from '@/Layouts/ChoiceLayout';
import Select_Service from './partials/Select_Service';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Service_Choice({ auth, data }) {

    const submit = (e) => {
        e.preventDefault();

        alert("aaaaaaaa");
    }

    return (
        <>
            <Head title="Servicios de Streaming" />
            <Choice user={auth.user} title={"¡Bienvenido, " + auth.user.username + "! Por favor, indique sus servicios de streaming contratados."}>
                <form onSubmit={submit}>
                    <div className="flex flex-col">
                        <div className="mt-10 mx-auto">
                            <Select_Service data={data} />
                        </div>
                        <div className="flex justify-center md:justify-end md:mx-20 my-4">
                            <PrimaryButton>Finalizar Registro</PrimaryButton>
                        </div>
                    </div>
                </form>
            </Choice>
        </>
    );
}
