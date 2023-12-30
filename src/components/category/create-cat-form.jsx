import React, { useState, useEffect, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../utils/error-fallback';

import axios from '../../utils/future-self-api.js';
import { createCat } from '../../utils/future-self-api.js';
// import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';
import { useCatsQuery} from '../contexts/current-cats-context';

import Header from '../header';
import CatForm from './cat-form';
import CircularColor from '../spinner.jsx';
import { useMutation, QueryClient } from '@tanstack/react-query';

export default function CreateCatForm() {
  const [loading, setLoading] = useState(false);
  // const { categories, addCategory } = useContext(CategoryContext);
  const { userId } = useContext(UserContext);
  // const {data: cats} = useCatsQuery(userId);

  
  const [cat, setCat] = useState('');
const [catId, setCatId] = useState('');
  const [inUse, setInUse] = useState(false);
  const [sent, setSent] = useState(false);
  let _category = useRef({ name: '', id: null });
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
  const name = watch('name');
  let error;

  // if (cats) {
  //   cats.map((cat) => {
  //     let localCatName = cat.name;
  //     let name2;
  //     if (localCatName) name2 = localCatName.toLocaleLowerCase();
  //     catNames.push(name2);
  //   });
  // }
  // const { mutateAsync: createCatMutation } = useMutation(setLoading(true), {
  //   mutationFn: async (data) => await createCat(data, userId),
  //   onSucess: async (data) => {
  //     let curCatId;
  //     curCatId = await data;
  //     _category.current = {
  //       name: name,
  //       id: await curCatId,
  //     };
  //     QueryClient.setQueryData('cats', (data) => {
  //       cats.push({ id: data, name: name });
  //     });
      // setSent(true);
  //   setLoading(false);
  //   await setCat(_category.current);
  //   await setCatId(_category.current.id);
  //   },
  // });

  // useEffect(() => {
  //   name.length > 3 && catNames.includes(name.toLocaleLowerCase().trim())
  //     ? setInUse(true)
  //     : setInUse(false);
  // }, [name]);

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);
  return (
    <div>
      <Header ID={'category-title'} title={'Category'} />
      {!sent && (
        <form
          onSubmit={handleSubmit(createCatMutation, error)}
          id="catName"
          method="post"
          action="send"
          disabled={catId}
          hidden={catId}
          encType="multipart/form-data"
        >
          <h4 id="nameLable" className="nameLable left">
            {name.length > 3 && inUse ? (
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
              'create / edit a category'
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
              //  hidden={catId.catId}
              // disabled={catId}
              value={!inUse ? 'Create' : 'Edit'}
              onClick={() => {
                // !errors.name
                //   ? "style.visibility='hidden'"
                //   : "style.visibility='visible'";
              }}
            ></input>
          </fieldset>
        </form>
      )}
      {loading && <p>Loading.....</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>}

      {isSubmitSuccessful && !error && !inUse && (
        <p>{`title: ${name?.name} was saved successfully`}</p>
      )}

      {!_category.current.id || (!_category.current.name && <CircularColor />)}
      {_category.current.id && _category.current.name && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CatForm
            catName={_category.current.name}
            catId={_category.current.id}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
{
  /* <CatForm catId={catId}    /> */
}
