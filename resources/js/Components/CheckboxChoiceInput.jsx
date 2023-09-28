import InputLabel from './InputLabel';
import { useState } from 'react';

export default function Checkbox_Choice({ data, name, onChange, selectedValues }) {
  return (
    <>
      <InputLabel
        htmlFor={data.id}
        className={`bg-gray-800 p-20 rounded-lg cursor-pointer hover:bg-gray-700 ${
          selectedValues.includes(data.id + '') ? 'border border-white' : ''
        }`}
      >
        <img className="h-14 w-14" src={data.logo_path} alt={data.name} />
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
