import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import CategoryContext from '../contexts/category-context';
// import  useAxios  from '../hooks/use-axios';
import axios from '../../utils/_axios-programming-interface.js';


export default function CatNameForm({ userId, getCatId, catId }) {

    const { categories, addCategory, refreshCategories } = useContext(CategoryContext);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const catNames = [];
useEffect(() => {
  categories.map((cat) => {
    let catName = cat.name;
    let name2;
    if (catName) name2 = catName.toLocaleLowerCase();
    catNames.push(name2);
  });
}, [categories]);

  const name = watch('name');
  let error;
  
  // const [response, error, loading, axiosFetch] = useAxios();
  
  const onSubmit = async (data) => {
    try {
    let response = await axios.post('/api/category-api/addNew/?',{
      data,
      userId,
      error,
      // headers: { 'Content-Type': 'multipart/form-data' },
      })
    
      let catId = await response.data;
      console.log('catId =', catId, 'name =', name);
      let cat = { 'name':name,'id': catId,'userId': userId,'pros': [],'cons': [] };
      addCategory(cat);
      getCatId(catId);
    } catch (err) {
      console.log(err.message);
    } }
  
  
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
       refreshCategories();
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
        <h3 id="nameLable" className="nameLable left">
          Name:{' '}
          {
          catNames.includes(name.toLocaleLowerCase().trim())? (
            <span style={{ color: 'red', fontSize: '1.1rem' }}> Is in use</span>
          ) : (
            name
          )}
        </h3>
        <p></p>
        
        <p>{errors.name?.message}</p>
        <input
          type="text"
          autoFocus
          className="center"
          aria-describedby="Category name"
          id="name"
          {...register('name', {
            required: 'A minimum 4 characters is required.',
            minLength: 4,
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
          defaultValue="Create"
          onClick={() => "style.visibility='hidden'"}
        ></input>
    </form>
     {/* {loading && <p>Loading...</p>}

     {!loading && error && <p className="errMsg">{error.msg}</p>}

     {isSubmitSuccessful && !error && data.title && (
       <p>{`title: ${data?.title} was saved successfully`}</p>)} */}
    </div>
  );
}
