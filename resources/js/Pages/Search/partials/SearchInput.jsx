import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function SearchInput({ ...props }) {
    return (
        <>
            <div className="">
                    <InputLabel className='hidden' htmlFor="query" value="Realizar una búsqueda..." />

                    <TextInput
                        id="query"
                        type="text"
                        name="query"
                        placeholder="Buscar..."
                        className="mt-5 block w-full bg-zinc-900 border-0 border-b-4 focus:border-b-4 focus:ring-0 text-white h-20 text-xl"
                        isFocused={true}
                        minLength="2" 
                        {...props}
                    />
            </div>
        </>
    );
}
