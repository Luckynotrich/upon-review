import React, { useEffect, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';
import ShowReview from '../show-review';

// import  useAxios  from '../hooks/use-axios-dep';
import axios from '../../utils/future-self-api';
import CatNameForm from './cat-name-form';
import Header from '../header';
import TextInput from './text-input';

export default function CatForm() {
  const { categories, addCategory } = useContext(CategoryContext);
  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [inUse, setInUse] = useState(false);

  function handleCatId(NewCatId) {
    setCatId(NewCatId);
  }

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
    if (!inUse) {
      await axios.put('/api/category-api/updateOne/?', {
        data,
        catId,
        error,
        // headers: { 'Content-Type': 'multipart/form-data' },
      });
      await addCategory(response);
    } else {
      await axios.put('/api/preference-api/updateOne/?', {
        data,
        catId,
        error,
        // headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    await useNavigate('/ShowReview');
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <Header ID={'category-title'} title={'Category'} />

      <div className="container">
        <CatNameForm
          userId={userId}
          catId={catId}
          getCatId={handleCatId}
          catName={catName}
          getCatName={setCatName}
          setInUse={setInUse}
          inUse={inUse}
        />
        <form
          onSubmit={handleSubmit(onSubmit, error)}
          id="category"
          method="post"
          action="send"
          disabled={!catId}
          encType="multipart/form-data"
        >
         {catName && <h4 className="left">Pros</h4>}
          {catName && <fieldset>
            {[...Array(5)].map((e, i) =>{
              return (
              <TextInput 
              register={register}
              procon={'pro'+i}
              // value={ categories[catId].pros[i] !== undefined ? category[catId].pros[i].value :''}
              // id={ categories[catId].pros[i] !== undefined ? category[catId].pros[i].id : `${i}`}
              />)})}
            {/* <input
              type="text"
              {...register('pro1')}
              id={!inUse ? 'pro1' : categories[catId].pros[0].id}
              disabled={!catId}
              className="center"
              placeholder="I like..."
              value={inUse ? categories[catId].pros[0].value : ''}
            ></input>

            <input
              type="text"
              {...register('pro2')}
              id={!inUse ? 'pro2' : categories[catId].pros[1].id}
              className="center"
              disabled={!catId}
              placeholder="I like..."
              value={inUse ? categories[catId].pros[1].value : ''}
            ></input>

            <input
              type="text"
              {...register('pro3')}
              id={!inUse ? 'pro3' : categories[catId].pros[2].id}
              className="center"
              disabled={!catId}
              placeholder="I like..."
              value={inUse ? categories[catId].pros[2].value : ''}
            ></input>

            <input
              type="text"
              {...register('pro4')}
              id={!inUse ? 'pro4' : categories[catId].pros[3].id}
              className="center"
              disabled={!catId}
              placeholder="I like..."
              value={inUse ? categories[catId].pros[3].value : ''}
            ></input>

            <input
              type="text"
              {...register('pro5')}
              id={!inUse ? 'pro5' : categories[catId].pros[4].id}
              className="center"
              disabled={!catId}
              placeholder="I like..."
              value={inUse ? categories[catId].pros[4].value : ''}
            ></input> */}
           </fieldset>}
          {catName && <h4 className="left">Cons</h4>}
          {catName && <fieldset>
            {/* <input
              type="text"
              {...register('con1')}
              id={!inUse ? 'con1' : categories[catId].cons[0].id}
              className="center"
              disabled={!catId}
              placeholder="I don't like..."
              value={inUse ? categories[catId].cons[0].value : ''}
            ></input>

            <input
              type="text"
              {...register('con2')}
              id={!inUse ? 'con2' : categories[catId].cons[1].id}
              className="center"
              disabled={!catId}
              placeholder="I don't like..."
              value={inUse ? categories[catId].cons[1].value : ''}
            ></input>

            <input
              type="text"
              {...register('con3')}
              id={!inUse ? 'con3' : categories[catId].cons[2].id}
              className="center"
              disabled={!catId}
              placeholder="I don't like..."
              value={inUse ? categories[catId].cons[2].value : ''}
            ></input>

            <input
              type="text"
              {...register('con4')}
              id={!inUse ? 'con4' : categories[catId].cons[3].id}
              className="center"
              disabled={!catId}
              placeholder="I don't like..."
              value={inUse ? categories[catId].cons[3].value : ''}
            ></input>

            <input
              type="text"
              {...register('con5')}
              id={!inUse ? 'con5' : categories[catId].cons[4].id}
              className="center"
              disabled={!catId}
              placeholder="I don't like..."
              value={inUse ? categories[catId].cons[4].value : ''}
            ></input>*/}
           </fieldset>}
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

        {/* {isSubmitSuccessful && !error && data.title && (
        <p>{`title: ${data?.title} was saved successfully`}</p>
      )} */}
      </div>
    </>
  );
}
