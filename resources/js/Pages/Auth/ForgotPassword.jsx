import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';


export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        email: '',
    });

    
    const validationRules = {
        email: {
            required: true,
            regex: /^[\w\.-]+@[\w\.-]+\.\w+$/,
        },
    };

    const messages = {
        email: {
            required: 'El correo electronico es obligatorio.',
            regex: 'El correo no es válido',
        },
    };

    const validate = (field, value) => {
        let isValid = false;
        const rules = validationRules[field];

        if (rules.required && value === "") {
            setError(field, messages[field].required);
        } else if (rules.regex && !rules.regex.test(value)) {
            setError(field, messages[field].regex);
        } else {
            isValid = true;
            clearErrors(field);
        }

        return isValid;
    };

    const submit = (e) => {
        e.preventDefault();

        if(validate('email', data.email)){
            post(route('password.email'));
        }else{
            toast.error('Tiene errores en el formulario.');
        }
    };

    return (
        <>
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                ¿Olvidó su contraseña? No hay problema. Indique su correo electronico y le enviaremos un enlace
                para reiniciar su contraseña.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    onInput={(e) => validate('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Enviar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        <Toaster />

        </>
    );
}
