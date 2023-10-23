import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@material-tailwind/react";
import Select from "react-select";

export default function SearchFilters({ genres }) {
    // anio de lanzamiento
    // categoria
    // rango de reseñas
    // servicios contratados o en general
    // tipo

    const typeOptions = [
        { value: "movie", label: "Película" },
        { value: "TV", label: "Serie" },
    ];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                    <InputLabel
                        className="text-white my-3"
                        htmlFor="type"
                        value="Tipo"
                    />
                    <Select options={typeOptions} name="type" id="type" isClearable={true} />
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
                            step="1"
                            name="yearFrom"
                            className="w-full"
                            required
                        />
                        <span className="text-white">-</span>
                        <TextInput
                            id="yearUntil"
                            type="number"
                            min="1900"
                            max="2099"
                            step="1"
                            name="yearUntil"
                            className="w-full"
                            required
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
                        placeholder="Seleccione..."
                        options={genres}
                        className="basic-multi-select"
                        classNamePrefix="select"
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
                            className="w-full"
                            required
                        />
                        <span className="text-white">-</span>
                        <TextInput
                            id="reviewUntil"
                            type="number"
                            min="1"
                            max="5"
                            step="1"
                            name="reviewUntil"
                            className="w-full"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3"></div>
                <div className="flex justify-end gap-3">
                    <Button className="bg-black text-white w-full md:w-auto" type="reset">Borrar</Button>
                    <Button className="bg-white text-black w-full md:w-auto" type="submit">Buscar...</Button>
                </div>
            </div>
        </>
    );
}
