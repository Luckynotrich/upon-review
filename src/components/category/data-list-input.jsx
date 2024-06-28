import { ForkLeft } from '@mui/icons-material';
import React from 'react';

export default function DataListInput({ register, categories }) {
  return (
    <>
      <label htmlFor="name">
        <input
        autoComplete="off"
        {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'A minimum 4 characters is required.',
                    },
                  })}
          list="list-cats"
          id="name"
          name="name"
          type="text"
          autoFocus
          className="center"
          aria-describedby="create category name"
        />
      </label>
      {/* <div style={{datalist{"margin:"}}}> */}
      <datalist id="list-cats" key={'list-cats'} style={{marginLeft:"-20%"}}>
        {categories.map(
          (cat) => (
            `${cat.name}`,
            (
              <option value={cat.name} key={cat.name}>
                {cat.name}
              </option>
            )
          )
        )}
      </datalist>
      {/* </div> */}
    </>
  );
}
