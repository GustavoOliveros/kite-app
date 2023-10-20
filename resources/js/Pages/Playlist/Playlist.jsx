import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchResults from '../Search/partials/SearchResults';
import { useState } from 'react';
import { Spinner, Button } from '@material-tailwind/react';
import axios from 'axios';
import PlaylistFilter from './partials/PlaylistFilter';
import { TrashIcon, ListBulletIcon } from '@heroicons/react/24/solid';

export default function Playlist({ auth, playlist, titles }) {
    const [filteredTitles, setFilteredTitles] = useState(titles);
    const [loading, setLoading] = useState(false);
    const { data, setData, delete: destroy } = useForm({
        id: playlist.id,
    });


    const fetchData = (filter) => {
        return axios.get(route('filterPlaylist', { filter: filter, id: playlist.id }))
          .then((response) => {
            setLoading(false);
            setFilteredTitles(response.data)
          });
      };
    
    const submit = (e) => { 
        setLoading(true);
        fetchData(e.target.value);
    };

    const deleteHandler = (e) => {
        destroy(route('playlist.destroy', {id: playlist.id}))
    }

    return (
        <>
        {console.log(filteredTitles)}
            <Head title={playlist.title} />
            <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
                <div className='flex flex-col md:flex-row md:gap-5 text-center md:text-start'>
                    <h1 className='text-4xl text-white my-5 flex items-center justify-center md:justify-start'><ListBulletIcon className='w-5 h-5 mx-2' />{playlist.title}</h1>
                    <div className='flex justify-center gap-2'>
                        <div className='my-auto'>
                            <PlaylistFilter
                                    onChange={submit}
                            />
                        </div>
                        
                        <Button onClick={deleteHandler} className='my-auto flex flex-row items-center justify-center md:justify-start gap-2 bg-white'>
                            <TrashIcon className='w-5 h-5 text-red-600' /><span className='hidden md:block text-red-600'>Eliminar</span>
                        </Button>
                    </div>
                    
                    {loading ? <Spinner className='animate-spin h-5 w-5 mx-auto my-5 md:mx-0  md:my-auto' /> : ''}
                </div>
                <div>
                    {loading ? '' : <SearchResults data={filteredTitles} showNoResults={false} />}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
