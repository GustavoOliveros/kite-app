import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from "@material-tailwind/react";
import Select from "react-select";

export default function SearchFilters({
    genres,
    setSelectedGenres,
    setSelectedType,
    setFormData,
    services,
    setSelectedServices,
}) {
    const typeOptions = [
        { value: "movie", label: "Película" },
        { value: "tv", label: "Serie" },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:grid grid-cols-2 gap-3">
                    <div>
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="type"
                            value="Tipo"
                        />
                        <Select
                            options={typeOptions}
                            name="type"
                            id="type"
                            onChange={setSelectedType}
                            isClearable={true}
                            placeholder="Seleccione uno..."
                            noOptionsMessage={() => {
                                return "No se encontraron coincidencias...";
                            }}
                        />
                    </div>
                    <div>
                        <InputLabel
                            className="text-white my-3"
                            htmlFor="services"
                            value={
                                <>
                                    Servicios{" "}
                                    <Tooltip
                                        content="Por defecto se busca por sus servicios contratados."
                                        placement="bottom"
                                    >
                                        <QuestionMarkCircleIcon className="w-3 h-3 inline-flex" />
                                    </Tooltip>{" "}
                                </>
                            }
                        />
                        <Select
                            isMulti
                            name="services"
                            placeholder="Seleccione uno o más..."
                            options={services}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={setSelectedServices}
                        />
                    </div>
                </div>

                <div className="">
                    <InputLabel
                        className="text-white my-3"
                        htmlFor="yearFrom"
                        value="Año de lanzamiento"
                    />
                    <div className="flex text-black gap-3 justify-center items-center">
                        <TextInput
                            id="yearFrom"
                            type="number"
                            min="1900"
                            max="2099"
                            placeholder="1900"
                            step="1"
                            name="yearFrom"
                            className="w-full focus:border-skyblue focus:ring-skyblue pb-1"
                            onChange={(e) => {
                                setFormData("yearFrom", e.target.value);
                            }}
                        />
                        <span className="text-white">-</span>
                        <TextInput
                            id="yearUntil"
                            type="number"
                            min="1900"
                            max="2099"
                            placeholder="2099"
                            step="1"
                            name="yearUntil"
                            className="w-full focus:border-skyblue focus:ring-skyblue pb-1"
                            onChange={(e) => {
                                setFormData("yearUntil", e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div>
                    <InputLabel
                        className="text-white my-3"
                        htmlFor="genres"
                        value="Categorías"
                    />
                    <Select
                        isMulti
                        name="genres"
                        placeholder="Seleccione una o más..."
                        options={genres}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={setSelectedGenres}
                    />
                </div>

                <div className="">
                    <InputLabel
                        className="text-white my-3"
                        htmlFor="reviewFrom"
                        value="Rango de reseñas"
                    />
                    <div className="flex text-black gap-3 justify-center items-center">
                        <TextInput
                            id="reviewFrom"
                            type="number"
                            min="1"
                            max="5"
                            step="1"
                            name="reviewFrom"
                            placeholder="1"
                            className="w-full focus:border-skyblue focus:ring-skyblue pb-1"
                            onChange={(e) => {
                                setFormData("reviewFrom", e.target.value);
                            }}
                        />
                        <span className="text-white">-</span>
                        <TextInput
                            id="reviewUntil"
                            type="number"
                            min="1"
                            max="5"
                            step="1"
                            placeholder="5"
                            name="reviewUntil"
                            className="w-full focus:border-skyblue focus:ring-skyblue pb-1"
                            onChange={(e) => {
                                setFormData("reviewUntil", e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="hidden md:block"></div>

                <div className="md:flex justify-end gap-3 mt-5 md:mt-auto space-y-3 md:space-y-0">
                    <Button
                        className="bg-transparent shadow-none border-2 text-white w-full md:w-auto"
                        type="reset"
                    >
                        Borrar
                    </Button>
                    <Button
                        className="bg-white text-black w-full md:w-auto"
                        type="submit"
                    >
                        Buscar...
                    </Button>
                </div>
            </div>
        </>
    );
}
