import { Link, Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from '@/Components/SearchInput';
import axios from 'axios';
import { useState } from 'react';
import SearchResults from '@/Components/SearchResults';

export default function Search({ auth }) {
  const [data, setData] = useState([]); // React variable for the results
  const { data: formData, setData: setFormData } = useForm({
    query: '',
  }); // Form data

  const fetchData = (query) => {
    return axios.get(route('search-term', { query: query }))
      .then((response) => setData(response.data));
  };

  const submit = (e) => {
    e.preventDefault();   
    fetchData(formData.query);
  };

  return (
    <>
      <Head title="Búsqueda" />
      <AuthenticatedLayout user={auth.user}>
        <form onSubmit={submit}>
          <SearchInput
            value={formData.query}
            onChange={(e) => setFormData('query', e.target.value)}
          />
        </form>

        <SearchResults data={data} />
      </AuthenticatedLayout>
    </>
  );
}