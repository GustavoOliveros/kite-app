import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SearchInput from "./partials/SearchInput";
import axios from "axios";
import { useState } from "react";
import SearchResults from "./partials/SearchResults";
import { Button } from "@material-tailwind/react";
import SearchFilters from "./partials/SearchFilters";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function Search({ auth, genres, services }) {
    const [showNoResults, setShowNoResults] = useState(false);
    const [data, setData] = useState([]); // React variable for the results
    const [showGenres, setShowGenres] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    const { data: formData, setData: setFormData } = useForm({
        query: "",
        yearFrom: "",
        yearUntil: "",
        reviewFrom: "",
        reviewUntil: ""

    }); // Form data
    const [showFilters, setShowFilters] = useState(false);

    const fetchData = () => {
        setShowNoResults(true);

        const formDataAux = {
            formData: formData,
            selectedGenres: selectedGenres,
            selectedType: selectedType,
            selectedServices: selectedServices
        }

        console.log(formDataAux)

        return axios
            .post(route("search-term", formDataAux))
            .then((response) => {setData(response.data);setLoading(false);})
            .catch((error) => {setData([]);setLoading(false)});
    };

    const submit = (e) => {
        e.preventDefault();
        setShowGenres(false);
        setLoading(true);
        
        fetchData();
    };

    return (
        <>
            <Head title="Búsqueda" />
            <AuthenticatedLayout
                user={auth.user}
                permissions={auth.permissions}
            >
                <form onSubmit={submit}>
                    <SearchInput
                        value={formData.query}
                        onChange={(e) => setFormData("query", e.target.value)}
                        loading={loading}
                    />
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
                    </div>
                    {showFilters ? <SearchFilters setSelectedGenres={setSelectedGenres} setSelectedServices={setSelectedServices} setSelectedType={setSelectedType} setFormData={setFormData} genres={genres} services={services} /> : ""}
                </form>

                <div className="flex flex-col justify-center my-5">
                    {loading ? '' : <SearchResults data={data} showNoResults={showNoResults} />}

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        {showGenres
                            ? genres.map((element, index) => (
                                  <Link
                                      key={index}
                                      href={route("genres.show", {
                                          id: element.value,
                                      })}
                                      className="text-white text-xl bg-zinc-900 border-2 border-transparent min-h-max transition ease-in-out hover:border-white  py-10 text-center rounded-lg flex items-center justify-center"
                                  >
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
