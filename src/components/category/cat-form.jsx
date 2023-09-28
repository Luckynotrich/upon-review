import React, { useEffect, useContext, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import CategoryContext from '../contexts/category-context';

// import ShowReview from '../show-review';

// import  useAxios  from '../hooks/use-axios-dep';
import axios from '../../utils/future-self-api';

import Header from '../header';
// import TextInput from './text-input';

export default function CatForm(cat, inUse) {
  const { /* categories, */ updateCategory } = useContext(CategoryContext);
  const _cat = useRef({name: '',id: null, pros: [], cons: []});
  let catId;
  useEffect(() => {
    if (cat) {
      console.log('CatForm ->', cat);
      _cat.current.id = cat.id;
      if (cat.pros === undefined ) {
        _cat.current.pros = [];
        [...Array(5)].map((item = '') => {
          _cat.current.pros.push(item);
        });
      if(cat.cons === undefined){
        _cat.current.cons = [];
        [...Array(5)].map((item = '') => {
          _cat.current.cons.push(item);
        });
      }
    }
  }}, [cat]);

  const {
    register,
    control,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
  //   defaultValues: {
  //     pros: _cat.current.pros,
  //     cons: _cat.current.cons,
  //   },
  });
  // const {
  //   fields: proFields,
  //   append: proAppend,
  //   remove: proRemove,
  // } = useFieldArray({
  //   control,
  //   name: 'pros',
  // });
  // const {
  //   fields: conFields,
  //   append: conAppend,
  //   remove: conRemove,
  // } = useFieldArray({
  //   control,
  //   name: 'cons',
  // });
  //  const [response, error, loading, axiosFetch] = useAxios();
  let error;
  const onSubmit = async (data) => {
    if (!inUse) {
      await axios.put('/api/category-api/updateOne/?', {
        data,
        catId,
        error,
      });
      await updateCategory(response);
    } else {
      await axios.put('/api/preference-api/updateOne/?', {
        data,
        catId,
        error,
      });
    }
    await useNavigate(Link('/ShowReview'));
  };

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);

  return (
    <>
      <Header ID={'category-title'} title={'Category'} />
      {!inUse && <h5>then add pros and cons (optional)</h5>}
      <div className="container">
        {_cat && (
          <form
            onSubmit={handleSubmit(onSubmit, error)}
            id="category"
            method="post"
            action="send"
            disabled={!catId}
            encType="multipart/form-data"
          >
  {/*            <h4 className="left">Pros</h4> */}
  {/*            <fieldset> */}
  {/*              {proFields.map((item, index) => { */}
               {/* return (
                   <li key={item.id}>
                     <input {...register(`pros.${index}.value`)} />
                     <button
                       type="buton"
                       onClick={() => {
                         proRemove(index);
                       }}
                     >
                       Delete
                     </button>
                   </li>
                 );
               })}
               <button type="button" onClick={() => proAppend({ value: '' })}>
                 Append
               </button>
             </fieldset>
             <h4 className="left">Cons</h4>
             <fieldset>
               {conFields.map((item, index) => {
                 return (
                   <li key={item.id}>
                     <input {...register(`cons.${index}.value`)} />
                     <button
                       type="button"
                       onClick={() => {
                         conRemove(index);
                       }}
                     >
                       Delete
                     </button>
                   </li>
                 );
               })}
               <button type="button" onClick={() => conAppend({ value: '' })}>
                 Append
               </button>
             </fieldset> */}

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
