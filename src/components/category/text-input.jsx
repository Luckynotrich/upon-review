// text-input.jsx
import React, { useContext } from 'react';
// import { register } from 'react-hook-form';
import CategoryContext from '../contexts/category-context';

export default function TextInput({ procon, register, id, value, catId }) {
    const { categories} = useContext(CategoryContext);
   return(
     <input
    type="text"
    {...register(procon)}
    id={id}
    disabled={!catId}
    className="center"
    placeholder="I like..."
    value={value}
  ></input>)
}