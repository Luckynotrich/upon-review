import React, { useState, useEffect, useContext,useRef } from 'react';
import { useForm } from 'react-hook-form';
import CategoryContext from '../contexts/category-context';
import CatForm from './cat-form';
import UserContext from '../contexts/user-context';

import axios from '../../utils/future-self-api.js';

export default function CreateCatForm() {
  const [loading, setLoading] = useState(false);
  const { categories, addCategory } = useContext(CategoryContext);
  const { userId } = useContext(UserContext);
  const [catId, setCatId] = useState('');
  const [cat, setCat] = useState('');
  const [catName, setCatName] = useState('');
  const [inUse, setInUse] = useState(false);
  let _category = useRef();
  const [YELLOW] = useState('#FAFA37');

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
      catNames.push(name2);
    });
  }
  // }, []);

  const name = watch('name');
  let error;

  // const [response, error, loading, axiosFetch] = useAxios();

  const onSubmit = async (data) => {
    let curCatId
    if (!inUse) {
      setLoading(true);
      try {
        let response = await axios.post('/api/category-api/addNew/?', {
          data,
          userId,
          error,
        });

       curCatId = await response.data;

        _category ={
          name: name,
          id: curCatId,
          userId: userId,
          pros: [],
          cons: [],
        };
        addCategory(_category.current);
        setCatId(curCatId);
        loading && setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (inUse) {
      _category.current = categories.find((cat) => cat.name === name);
    }
    setCatId(_category.id);
    setCat(_category.current)
    console.log('catNameForm', cat)
  };
useEffect(() => {
  name.length > 3 && catNames.includes(name.toLocaleLowerCase().trim())
      ? setInUse(true)
      : setInUse(false);
}, [name]);
  

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
          {name.length > 3 &&
          inUse ? (
            <span style={{ color: `${YELLOW}`, fontSize: '1.5rem' }}>
              {name} -- is in use.--- Select button to edit this category.
            </span>
          ) : errors.name ? (
            <span style={{ color: 'red', fontSize: '1.5rem' }}>
              {errors.name.message}{' '}
            </span>
          ) : name.length > 3 ? (
            <span style={{ color: 'green', fontSize: '1.5rem' }}>
              {name} -- is available
            </span>
          ) : (
            'create a category name'
          )}
        </h4>
        <fieldset>
          <input
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
          ></input>
          <input
            type="submit"
            id="submitButton"
            className="create"
            hidden={catId}
            disabled={catId}
            value={!inUse ? 'Create' : 'Edit'}
            onClick={() => {
              !errors.name
                ? "style.visibility='hidden'"
                : "style.visibility='visible'";
            }}
          ></input>
        </fieldset>
        {!inUse && <h5>then add pros and cons (optional)</h5>}
      </form>
      {loading && <p>Loading.....</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>}

      {isSubmitSuccessful && !error && !inUse && (
        <p>{`title: ${name?.name} was saved successfully`}</p>
      )}
      {cat && <CatForm
          catId={catId}
          cat={cat}
          inUse={inUse}
        />}
    </div>
  );
}
