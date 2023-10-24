import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from 'react';

export default function Login({ status, canResetPassword, success }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        if(validate('login', data.login) && validate('password', data.password)){
            post(route('login'))
        }else{
            toast.error('Tiene errores en el formulario.')
        }

        
    };

    const validationRules = {
        login: {
            required: true,
            regex: /^.{3,50}$/,
        },
        password: {
            required: true,
            regex: /^.{3,50}$/,
        },
    };

    // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const messages = {
        login: {
            required: 'El correo o usuario es obligatorio.',
            regex: 'El correo o usuario debe contener entre 3 y 50 caracteres',
        },
        password: {
            required: 'La contraseña es obligatoria.',
            regex: "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número.",
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

    useEffect(() => {
        if(success){
            toast.success(success)
        }
    }, [])


    return (
        <>
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit} noValidate>
                <div>
                    <InputLabel htmlFor="login" value="Nombre de usuario o Correo" />

                    <TextInput
                        id="login"
                        type="text"
                        name="login"
                        value={data.login}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('login', e.target.value)}
                        onInput={(e) => validate('login', e.target.value)}
                    />

                    <InputError message={errors.login} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        onInput={(e) => validate('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Olvidó su contraseña?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Iniciar sesión
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        <Toaster />
        </>
    );
}
