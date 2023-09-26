import InputLabel from './InputLabel';
import { useState } from 'react';

export default function Checkbox_Choice({ data, className = '', ...props }) {
  const [isChecked, setIsChecked] = useState(false);

  const changeHandler = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <InputLabel
        htmlFor={data.id_name}
        className={`bg-gray-800 p-20 rounded-lg cursor-pointer hover:bg-gray-700 ${
          isChecked ? 'border border-white' : ''
        }`}
      >
        <img className="h-14 w-14" src={data.logo_path} alt={data.name} />
      </InputLabel>
      <input
        {...props}
        type="checkbox"
        name={data.id_name}
        id={data.id_name}
        onChange={changeHandler}
        className={`rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 hidden ${className}`}
      />
    </>
  );
}
