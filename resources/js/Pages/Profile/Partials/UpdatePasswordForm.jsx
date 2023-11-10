import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';


export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful, setError, clearErrors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const validationRules = {
        current_password: {
            required: true,
            regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
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
        current_password: {
            required: 'La contraseña es obligatoria.',
            regex: "La contraseña debe tener al menos 8 caracteres, incluir una letra y un número.",
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

    const updatePassword = (e) => {
        e.preventDefault();

        if(validate('current_password', data.current_password) && validate('password', data.password) && validate('password_confirmation', data.password_confirmation)){
            put(route('password.update'), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    if (errors.password) {
                        reset('password', 'password_confirmation');
                        passwordInput.current.focus();
                    }
    
                    if (errors.current_password) {
                        reset('current_password');
                        currentPasswordInput.current.focus();
                    }
                },
            });
        }else{
            toast.error('Hay errores el formulario.');
        }


       
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Cambiar contraseña</h2>

            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Contraseña actual" />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onInput={(e) => validate('current_password', e.target.value)}
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onInput={(e) => validate('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirme su nueva contraseña" />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onInput={(e) => validate('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
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
