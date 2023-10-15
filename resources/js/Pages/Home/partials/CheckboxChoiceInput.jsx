import InputLabel from '../../../Components/InputLabel';

export default function CheckboxChoice({ data, name, onChange, selectedValues }) {
  return (
    <>
      <InputLabel
        htmlFor={data.id}
        className={`bg-gray-800 p-20 border-2 rounded-lg cursor-pointer hover:bg-gray-700 transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300 ${
          selectedValues.includes(data.id + '') ? 'border-white' : 'border-transparent'
        }`}
      >
        <img className="h-14 w-14  scale-150" src={data.logo_path} alt={data.name} />
      </InputLabel>
      <input
        type="checkbox"
        name={name}
        id={data.id}
        value={data.id}
        className='hidden'
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
