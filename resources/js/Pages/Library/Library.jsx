import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';
import LibraryFilter from './partials/LibraryFilter';
import { useState } from 'react';
import { Spinner } from '@material-tailwind/react';

export default function Library({ auth, titles }) {
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

    return (
        <>
        {console.log(filteredTitles)}
            <Head title="Mi Biblioteca" />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className='flex flex-row gap-5'>
                    <h1 className='text-4xl text-white my-5'>Mi Biblioteca</h1>
                    <div className='my-auto'>
                        <form>
                            <LibraryFilter
                                onChange={submit}
                            />
                        </form>
                    </div>
                    {loading ? <Spinner className='animate-spin h-5 w-5 my-auto' /> : ''}
                </div>
                <div>
                    {loading ? '' : <SearchResults data={filteredTitles} showNoResults={false} />}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
