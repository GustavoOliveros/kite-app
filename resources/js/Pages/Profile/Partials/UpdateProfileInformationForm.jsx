import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors } = useForm({
        email: user.email,
        password: ''
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

    const submit = (e) => {
        e.preventDefault();

        if(validate('email', data.email) && validate('password', data.password)){
            patch(route('profile.update'));
        }else{
            toast.error('Tiene errores en el formulario.');
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Cambiar correo electrónico</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        onInput={(e) => validate('email', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        onInput={(e) => validate('password', e.target.value)}

                    />

                    <InputError className="mt-2" message={errors.password} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Su correo no está verificado. <br />
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                               Haga clic aquí para que le reenviamos el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Le hemos envíado un nuevo correo de verificación.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
