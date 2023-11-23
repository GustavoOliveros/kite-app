import TextInput from '@/Components/TextInput';
import { Spinner } from '@material-tailwind/react';

export default function SearchInput({ loading, ...props }) {
    return (
        <>
            <div className="">
                <div className="bg-zinc-900 relative rounded-lg mt-5">
                    <TextInput
                        id="query"
                        type="text"
                        name="query"
                        placeholder="Buscar..."
                        className="block w-full bg-zinc-900 border-0 border-b-4 focus:border-b-4 focus:border-skyblue focus:ring-0 text-white h-20 text-xl"
                        isFocused={true}
                        minLength="2"
                        aria-label="Realizar una búsqueda..."
                        {...props}
                    />
                    <span className="text-white absolute inset-y-0 right-0 pr-3 flex items-center">
                        {loading ? <Spinner className="animate-spin w-5 h-5" /> : ''}
                    </span>
                </div>
            </div>
        </>
    );
}
