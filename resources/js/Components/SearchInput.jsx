import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function SearchInput({ ...props }) {
    return (
        <>
            <div className="p-3">
                    <InputLabel className='hidden' htmlFor="query" value="Realizar una búsqueda..." />

                    <TextInput
                        id="query"
                        type="text"
                        name="query"
                        placeholder="Buscar..."
                        className="mt-1 block w-full bg-zinc-800 border-0 border-b-4 focus:border-b-4 focus:ring-0 text-white h-20 text-xl"
                        isFocused={true}
                        minLength="2"
                        {...props}
                    />
            </div>
        </>
    );
}
