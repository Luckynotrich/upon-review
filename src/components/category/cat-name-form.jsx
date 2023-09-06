import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import CategoryContext from '../contexts/category-context';

import axios from '../../utils/future-self-api.js';


export default function CatNameForm({ userId, getCatId, catId, catName, getCatName }) {
  const [loading, setLoading] = useState(false);
  const { categories, addCategory } = useContext(CategoryContext);
  
  

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  let catNames = [];
  // useEffect(() => {
    if (categories.length > 0) {
      categories.map((cat) => {
        let catName = cat.name;
        let name2;
        if (catName) name2 = catName.toLocaleLowerCase();
        catNames.push( name2);
      });
    
     }
  // }, []);

  const name = watch('name');
  let error;

  // const [response, error, loading, axiosFetch] = useAxios();

  const onSubmit = async (data) => {
    // setLoading(true);
    try {
      let response = await axios.post('/api/category-api/addNew/?', {
        data,
        userId,
        error,
      });

      catId = await response.data;
      addCategory({
        name: name,
        id: catId,
        userId: userId,
        pros: [],
        cons: [],
      });
      loading && setLoading(false);
      getCatId(catId);
      getCatName(name);
    } catch (err) {
      console.log(err.message);
    }
    
  };
  
// useEffect(() => {
//    catNames.includes(name.toLocaleLowerCase().trim())? setError({name:'name',type: 'manual',message:'is in use'}):''/* setError(null) */;
// }, [name]);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, error)}
        id="catName"
        method="post"
        action="send"
        disabled={catId}
        hidden={catId}
        encType="multipart/form-data"
      >
        <h4 id="nameLable" className="nameLable left">
          
          {
          catNames.includes(name.toLocaleLowerCase().trim()) ? (
            <span style={{ color: 'red', fontSize: '1.1rem' }}>{name} is in use</span>
          ) :errors.name? (<span style={{ color: 'red', fontSize: '1.1rem' }}>{errors.name.message/* A minimum 4 characters is required. */} </span>): (
            name
          )} 
        </h4>
        {/* <p>{errors.name?.message}</p> */}
        <fieldset>
        <input
          type="text"
          autoFocus
          className="center"
          aria-describedby="create category name"
          id="name"
          {...register('name', {
            required: 'This is required',
            minLength: { value:4, message: 'A minimum 4 characters is required.'},
          })}
          placeholder="Category name"
          onFocus={() => "this.placeholder=''"}
          onBlur={() => "this.placeholder=''"}
        ></input>
        <input
          type="submit"
          id="submitButton"
          className="create"
          hidden={catId}
          disabled={catId}
          value="Create"
          onClick={() => {
            !errors.name? "style.visibility='hidden'": "style.visibility='visible'";
          
        }
        }
        ></input>
        
        </fieldset>
        <h5>then add pros and cons(optional)</h5>
      </form>
      {loading && <p>Loading.....</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>}

      {isSubmitSuccessful && !error && name && (
        <p>{`title: ${name?.name} was saved successfully`}</p>
      )}
    </div>
  );
}
