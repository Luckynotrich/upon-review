import React/* , {useEffect} */ from 'react';


export default function DataListInput({ register, categories }) {
//   useEffect(()=>{console.log('categories = ', categories)})
  return (
    <>
    <label htmlFor="name">
      <input
        autoComplete="off"
        list="list-cats"
        type="text"
        autoFocus
        className="center"
        aria-describedby="create category name"
        id="name"
        {...register('name', {
          required: 'This is required',
          minLength: {
            value: 4,
            message: 'A minimum 4 characters is required.',
          },
        })}
        placeholder="Category name"
        onFocus={() => "this.placeholder=''"}
        onBlur={() => "this.placeholder=''"}
      />
      </label>
      <datalist id="list-cats" key={'dadalist'}>
    {categories &&
      categories.map((cat) => {
        `${cat.name}`,
        <option key={cat.id} value={cat.name} text={cat.name}>{cat.name}</option>,
        `${console.log('cat.name =',cat.name)}`
      })}
  </datalist>
    </>
  );
}