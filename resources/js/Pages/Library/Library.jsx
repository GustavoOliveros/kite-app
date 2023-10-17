import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';
import LibraryFilter from './partials/LibraryFilter';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import toast, { Toaster } from "react-hot-toast";

export default function Library({ auth, titles, errors, success }) {
    const [filteredTitles, setFilteredTitles] = useState(titles);
    const [loading, setLoading] = useState(false);

    const fetchData = (filter) => {
        return axios.get(route('filterLibrary', { filter: filter }))
          .then((response) => {
            setLoading(false);
            setFilteredTitles(response.data)
          });
      };
    
    const submit = (e) => { 
        setLoading(true);
        fetchData(e.target.value);
    };

    const checkMessages = () => {
        if(errors[0]){
            toast.error(errors[0]);
        }else if(success){
            toast.success(success);
        }
        
    }

    useEffect(() => {
        checkMessages();
     }, []);

    return (
        <>
            <Head title="Mi Biblioteca" />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className='flex flex-col md:flex-row md:gap-5 text-center md:text-start'>
                    <h1 className='text-4xl text-white my-5'>Biblioteca</h1>
                    <div className='my-auto'>
                        <form>
                            <LibraryFilter
                                onChange={submit}
                            />
                        </form>
                    </div>
                    {loading ? <Spinner className='animate-spin h-5 w-5 mx-auto my-5 md:mx-0  md:my-auto' /> : ''}
                </div>
                <div>
                    {loading ? '' : <SearchResults data={filteredTitles} showNoResults={false} />}
                </div>
            </AuthenticatedLayout>
            <Toaster />
        </>
    );
}
