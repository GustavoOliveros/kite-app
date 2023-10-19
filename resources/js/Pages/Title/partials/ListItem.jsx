import InputLabel from "@/Components/InputLabel";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function ListItem({data, onChange, selectedValues}) {
    return (
        <>
        <InputLabel
          htmlFor={data.id}
          className="w-full py-2 hover:bg-gray-300 cursor-pointer flex flex-row justify-start gap-2"
        >
            { selectedValues.includes(data.id) ? <CheckIcon className="h-5 w-5 mx-2" /> : <CheckIcon className="h-5 w-5 mx-2 text-transparent" /> }{data.title}
        </InputLabel>
        <input
          type="checkbox"
          name="playlists"
          id={data.id}
          value={data.id}
          className='hidden'
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </>
    );
}
