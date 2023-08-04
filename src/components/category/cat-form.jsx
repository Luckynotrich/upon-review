import React, { useEffect, useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
// import "../scss/App.css"
import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';

// import  useAxios  from '../hooks/use-axios-dep';
import axios from '../../utils/future-self-api';
import CatNameForm from './cat-name-form';

export default function CatForm(/* props */) {
  const { categories, refreshCategories , addCategory } = useContext(CategoryContext);
  const [catId, setCatId] = useState('');

  function handleCatId(NewCatId) {setCatId(NewCatId)}

  const { userId } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      pro1: '',
      pro2: '',
      pro3: '',
      pro4: '',
      pro5: '',
      con1: '',
      con2: '',
      con3: '',
      con4: '',
      con5: '',
    },
  });

  //  const [response, error, loading, axiosFetch] = useAxios();
  let error;
  const onSubmit = async (data) => {
     await axios.post('/api/category-api/updateOne/?',
       {
        data,
        catId,
        error,
        // headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    // addCategory(response);
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
       refreshCategories();
      // return redirect('/');
    }
  }, [formState, reset]);

  return (
    <div className="container">
      <h1>Category</h1>
      <CatNameForm userId={userId} catId = {catId} getCatId={handleCatId} />
      <form
        onSubmit={handleSubmit(onSubmit, error)}
        id="category"
        method="post"
        action="send"
        disabled={!catId}
        encType="multipart/form-data"
      >
        <h4 className="left">Pros</h4>

        <input
          type="text"
          {...register('pro1')}
          id="pro1"
          disabled={!catId}
          className="center"
          placeholder="I like..."
        ></input>

        <input
          type="text"
          {...register('pro2')}
          id="pro2"
          className="center"
          disabled={!catId}
          placeholder="I like..."
        ></input>

        <input
          type="text"
          {...register('pro3')}
          id="pro3"
          className="center"
          disabled={!catId}
          placeholder="I like..."
        ></input>

        <input
          type="text"
          {...register('pro4')}
          id="pro4"
          className="center"
          disabled={!catId}
          placeholder="I like..."
        ></input>

        <input
          type="text"
          {...register('pro5')}
          id="pro5"
          className="center"
          disabled={!catId}
          placeholder="I like..."
        ></input>

        <h4 className="left">Cons</h4>

        <input
          type="text"
          {...register('con1')}
          id="con1"
          className="center"
          disabled={!catId}
          placeholder="I don't like..."
        ></input>

        <input
          type="text"
          {...register('con2')}
          id="con2"
          className="center"
          disabled={!catId}
          placeholder="I don't like..."
        ></input>

        <input
          type="text"
          {...register('con3')}
          id="con3"
          className="center"
          disabled={!catId}
          placeholder="I don't like..."
        ></input>

        <input
          type="text"
          {...register('con4')}
          id="con4"
          className="center"
          disabled={!catId}
          placeholder="I don't like..."
        ></input>

        <input
          type="text"
          {...register('con5')}
          id="con5"
          className="center"
          disabled={!catId}
          placeholder="I don't like..."
        ></input>

        <input
          type="submit"
          id="submitButton"
          className="create"
          hidden={!catId}
          defaultValue="Create"
        ></input>
      </form>
      {/* {loading && <p>Loading...</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>} */}

      {isSubmitSuccessful && !error && data.title && (
        <p>{`title: ${data?.title} was saved successfully`}</p>
      )}
    </div>
  );
}
