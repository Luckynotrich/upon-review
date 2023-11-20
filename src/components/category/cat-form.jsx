import React, { useEffect, useContext, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import  UserContext  from '../contexts/user-context';
import CategoryContext from '../contexts/category-context';
import { catObj } from '../../utils/cat-obj';

import axios from '../../utils/future-self-api';

export default function CatForm(catId) {
  const { userId } = useContext(UserContext);
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
    formState: { errors, isDirty, isSubmitSuccessful,isLoading },
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
  
  let error;
  const onSubmit = async (data) => {
    await updateCategory(catId, data);
    setLoading(true);
    await axios.put('/api/category-api/updateOne/?', {
      data,
      catId,
      error,
    });
  };

  useEffect(() => {
    console.log('isSubmitSuccessful ', isSubmitSuccessful);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      {_cat && <h5>then add likes and dislikes (optional)</h5>}
      <div className="container">
        {_cat && (
          <form
            onSubmit={handleSubmit(onSubmit, error)}
            encType="multipart/form-data"
            method="put"
            action='send'
            id="category"
            // disabled={!catId}
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

                    <button
                      className="inputBtn material-symbols-outlined deleteBtn"
                      type="buton"
                      onClick={(e) => {
                        proRemove(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                className="inputBtn appendBtn material-symbols-outlined"
                onClick={() => proAppend({ value: '' })}
              >
                add_box
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

                    <button
                      className="inputBtn material-symbols-outlined deleteBtn"
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
              <button
                type="button"
                className="inputBtn appendBtn material-symbols-outlined"
                onClick={() => conAppend({ value: '' })}
              >
                add_box
                {/* <span class="material-symbols-outlined">add_box</span> */}
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
