import React, { useEffect, useContext, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import CategoryContext from '../contexts/category-context';
import { catObj } from '../../utils/cat-obj';

import ShowReview from '../show-review';
import axios from '../../utils/future-self-api';

import Header from '../header';
// import TextInput from './text-input';

export default function CatForm(catId) {
  const { categories, updateCategory, categoryIndexOf } =
    useContext(CategoryContext);
  const _cat = useRef();
//kind of wierd that I have to destructure catId to get the value of catId
  let index = categoryIndexOf(catId.catId);
  _cat.current = catObj(categories[index]);

  const {
    register,
    control,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      pros: _cat.current.pros,
      cons: _cat.current.cons,
    },
  });
  const {
    fields: proFields,
    append: proAppend,
    remove: proRemove,
  } = useFieldArray({
    control,
    name: 'pros',
  });
  const {
    fields: conFields,
    append: conAppend,
    remove: conRemove,
  } = useFieldArray({
    control,
    name: 'cons',
  });
  //  const [response, /* error, */ loading, axiosFetch] = useAxios();
  let error;
  const onSubmit = async (data) => {
    setLoading(true);
    await axios.put('/api/preference-api/updateOne/?', {
      data,
      catId,
      error,
    });
    await updateCategory(response);
    await useNavigate(Link('/ShowReview'));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <Header ID={'category-title'} title={'Category'} />
      {_cat && <h5>then add likes and dislikes (optional)</h5>}
      <div className="container">
        {_cat && (
          <form
            // onSubmit={handleSubmit(onSubmit, error)}
            id="category"
            method="post"
            action="send"
            disabled={!catId}
            encType="multipart/form-data"
          >
            <h4 className="left">Likes</h4>
            <fieldset>
              {proFields.map((item, index) => {
                return (
                  <div key={item.id}>
                    <input
                      {...register(`pros.${index}.value`)}
                      type="text"
                      className="center"
                      placeholder="I like..."
                    />
                     
                      {item.value && <button className="inputBtn"
                        type="buton"
                        onClick={(e) => {
                          proRemove(index);
                          }}>
                        {item.value ? 'Delete' : 'Commit'}
                      </button>}
                    
                  </div>
                );
              })}
              <button type="button" className="inputBtn appendBtn" onClick={() => proAppend({ value: '' })}>
                Append
              </button>
            </fieldset>
            <h4 className="left">Dis-likes</h4>
            <fieldset>
              {conFields.map((item, index) => {
                return (
                  <div key={item.id}>
                    <input
                      {...register(`cons.${index}.value`)}
                      type="text"
                      className="center"
                      placeholder="I don't like..."
                    />
                    
                      <button className="inputBtn"
                        type="button"
                        onClick={() => {
                          conRemove(index);
                        }}
                      >
                        Delete
                      </button>
                    
                  </div>
                );
              })}
              <button type="button" className="inputBtn appendBtn" onClick={() => conAppend({ value: '' })}>
                Append
              </button>
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
