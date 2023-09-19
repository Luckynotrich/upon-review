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
  const { /* categories, */ addCategory } = useContext(CategoryContext);
  const [catId, setCatId] = useState('');
  const [cat, setCat] = useState('');
  const [catName, setCatName] = useState('');
  const [inUse, setInUse] = useState(false);

  const { userId } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      pros: [''],
      cons: [''],
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
      });
      await addCategory(response);
    } else {
      await axios.put('/api/preference-api/updateOne/?', {
        data,
        catId,
        error,
      });
    }
    await useNavigate('/ShowReview');
  };
  
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  useEffect(() => {
    console.log('catForm cat', cat);
  }, [cat]);

  return (
    <>
      <Header ID={'category-title'} title={'Category'} />

      <div className="container">
        <CatNameForm
          userId={userId}
          catId={catId}
          setCatId={setCatId}
          setCatName={setCatName}
          cat={cat}
          setCat={setCat}
          setInUse={setInUse}
          inUse={inUse}
        />
        {cat && (
          <form
            onSubmit={handleSubmit(onSubmit, error)}
            id="category"
            method="post"
            action="send"
            disabled={!catId}
            encType="multipart/form-data"
          >
            <h4 className="left">Pros</h4>
            <fieldset>
              {[...Array(5)].map((e, i) => {
                return (
                  <TextInput
                    register={register}
                    procon={'pro' + i}
                    value={
                      i >! cat.pros.length - 1 ||
                      typeof cat.pros[i] !== undefined
                        ? setValue(cat.pros[i].value)
                        : ''
                    }
                    id={cat.pros[i] !== undefined ? cat.pros[i].id : `pros${i}`}
                  />
                );
              })}
              
            </fieldset>
            <h4 className="left">Cons</h4>
            <fieldset>
              
            </fieldset>
            <input
              type="submit"
              id="submitButton"
              className="create"
              hidden={!catId}
              defaultValue="Create"
            ></input>
          </form>
        )}
        {/* {loading && <p>Loading...</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>} */}

        {/* {isSubmitSuccessful && !error && data.title && (
        <p>{`title: ${data?.title} was saved successfully`}</p>
      )} */}
      </div>
    </>
  );
}
