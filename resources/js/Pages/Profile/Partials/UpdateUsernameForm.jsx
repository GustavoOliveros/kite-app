import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

export default function UpdateUsernameForm({ status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful, setError, clearErrors } = useForm({
        username: user.username,
        password: ''
    });

    const validationRules = {
        username: {
            required: true,
            regex: /^.{3,50}$/,
        },
        password: {
            required: true,
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        },
    };

    const messages = {
        username: {
            required: 'El usuario es obligatorio.',
            regex: 'El usuario debe contener entre 3 y 50 caracteres',
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

        if(validate('username', data.username) && validate('password', data.password)){
            patch(route('profile.update'));
        }else{
            toast.error('Tiene errores en el formulario.');
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Cambiar nombre de usuario</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="username" value="Nombre de usuario" />

                    <TextInput
                        id="username"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        autoComplete="username"
                        onInput={(e) => validate('username', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.username} />
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
