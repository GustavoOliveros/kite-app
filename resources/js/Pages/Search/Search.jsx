import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchInput from './partials/SearchInput';
import axios from 'axios';
import { useState } from 'react';
import SearchResults from './partials/SearchResults';
import { Button } from '@material-tailwind/react';
import SearchFilters from './partials/SearchFilters';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';

export default function Search({ auth, genres }) {
  const [showNoResults, setShowNoResults] = useState(false);
  const [data, setData] = useState([]); // React variable for the results
  const [showGenres, setShowGenres] = useState(true);
  const { data: formData, setData: setFormData } = useForm({
    query: '',
  }); // Form data
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = (query) => {
    setShowNoResults(true);
    return axios.get(route('search-term', { query: query }))
      .then((response) => setData(response.data));
  };

  const submit = (e) => {
    e.preventDefault();
    setShowGenres(false); 
    fetchData(formData.query);
  };

  return (
      <>
          <Head title="Búsqueda" />
          <AuthenticatedLayout user={auth.user} permissions={auth.permissions}>
              <form onSubmit={submit}>
                  <SearchInput
                      value={formData.query}
                      onChange={(e) => setFormData("query", e.target.value)}
                  />
              </form>

              <div className="flex flex-col justify-center my-5">
                  <Button
                      onClick={(e) => {
                          setShowFilters(!showFilters);
                      }}
                      className="text-white text-center bg-transparent shadow-none"
                  >
                      {showFilters ? (
                          <ChevronDownIcon className="w-5 h-5 inline-flex" />
                      ) : (
                          <ChevronUpIcon className="w-5 h-5 inline-flex" />
                      )}{" "}
                      Filtros de búsqueda
                  </Button>

                  <form>
                      {showFilters ? <SearchFilters genres={genres} /> : ""}
                  </form>

                  <SearchResults data={data} showNoResults={showNoResults} />

                  <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
                  {showGenres
                      ? genres.map((element, index) => (
                            <Link key={index} className="text-white text-xl bg-zinc-900 min-h-max py-10 text-center rounded-lg flex items-center justify-center" href="#">
                                {element.label}
                            </Link>
                        ))
                      : ""}
                  </div>
              </div>
          </AuthenticatedLayout>
      </>
  );
}