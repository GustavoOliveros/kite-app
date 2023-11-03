import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const validationRules = {
        email: {
            required: true,
            regex: /^[\w\.-]+@[\w\.-]+\.\w+$/,
        },
        password: {
            required: true,
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        },
        password_confirmation: {
            mustBeEqualTo: 'password'
        }
    };

    const messages = {
        email: {
            required: 'El correo es obligatorio.',
            regex: 'El correo no es válido',
        },
        password: {
            required: 'La contraseña es obligatoria.',
            regex: "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número.",
        },
        password_confirmation: {
            mustBeEqualTo: 'Los campos no coinciden.'
        }
    };

    const validate = (field, value) => {
        let isValid = false;
        const rules = validationRules[field];
    
        if (rules.required && value === "") {
            setError(field, messages[field].required);
        } else if (rules.regex && !rules.regex.test(value)) {
            setError(field, messages[field].regex);
        } else if (rules.mustBeEqualTo && value !== data[rules.mustBeEqualTo]) {
            setError(field, messages[field].mustBeEqualTo);
        } else {
            isValid = true;
            clearErrors(field);
        }
    
        return isValid;
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        if(validate('email', data.email) && validate('password', data.password) && validate('password_confirmation', data.password_confirmation)){
            post(route('password.store'))
        }else{
            toast.error('Tiene errores en el formulario.')
        }
    };

    return (
        <>
        <GuestLayout>
            <Head title="Reiniciar contraseña" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        onInput={(e) => validate('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                        onInput={(e) => validate('password', e.target.value)}

                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        onInput={(e) => validate('password_confirmation', e.target.value)}

                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Reiniciar contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        <Toaster />
        </>
    );
}
