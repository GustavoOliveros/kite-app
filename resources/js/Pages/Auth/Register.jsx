import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const { data, setData, post, processing, errors, clearErrors, setError } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (
            validate("username", data.username) &&
            validate("password", data.password) &&
            validate("email", data.email) &&
            validate("password_confirmation", data.password_confirmation)
        ) {
            post(route("register"));
        } else {
            toast.error("Tiene errores en el formulario.");
        }
    };

    const validationRules = {
        username: {
            required: true,
            regex: /^.{3,50}$/,
        },
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
        username: {
            required: 'El usuario es obligatorio.',
            regex: 'El usuario debe contener entre 3 y 50 caracteres',
        },
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

    return (
        <>
        <GuestLayout>
            <Head title="Crear Cuenta" />

            <form onSubmit={submit}>                
                <div className="mt-4">
                    <InputLabel htmlFor="username" value="Nombre de Usuario" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        isFocused={true}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('username', e.target.value)}
                        onInput={(e) => validate('username', e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo electrónico" />

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
                        onChange={(e) => setData('password', e.target.value)}
                        onInput={(e) => validate('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirme su contraseña" />

                    <TextInput
                        id="password_confirmation"
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
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ¿Ya está registrado?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Crear cuenta
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        <Toaster />
        </>
    );
}
