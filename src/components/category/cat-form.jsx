import React, { useEffect, useContext, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';

//  import { ErrorBoundary } from 'react-error-boundary';
//  import ErrorFallback from '../../utils/error-fallback';

// import { useCategoriesQuery} from '../contexts/current-categories-context'; 
import CategoryContext from '../contexts/category-context';
import { catObj } from '../../utils/cat-obj';

import {updateCat} from '../../utils/future-self-api';


export default function CatForm({catId, catName}) {
  const [display, setDisplay] = useState(false);
  useEffect(() => { if(catId) setDisplay(true)}, [])
  const queryClient = useQueryClient();

  const { categories, categoryIndexOf } =
    useContext(CategoryContext);
  const _cat = useRef();
  
  let index = categoryIndexOf(catId);
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
   
    const { mutateAsync: updateCatMutation } = useMutation({
      mutationFn: async (data) => await updateCat(data, catId),
      onSuccess: () => {
        queryClient.invalidateQueries('cats')
        reset();
      }}); 
 
  // const {data: cats} = useCategoriesQuery(userId);
  useEffect(() => {
    console.log('isSubmitSuccessful ', isSubmitSuccessful);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset, isSubmitSuccessful]);

  return (
    <>
      {_cat && <h5>{catName} add likes and dislikes (optional)</h5>}
      <div className="container">
      {/* {_cat && } */}
        {_cat && (
          //  <ErrorBoundary FallbackComponent={ErrorFallback}>
          
          
          <form
            onSubmit={handleSubmit(updateCatMutation, error)}
            encType="multipart/form-data"
            method="put"
            action='send'
            id="category"
            disabled={!display}
            hidden={!display}
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
              hidden={!display}
              defaultValue="Create"
              onClick={ async () => {
              //   try {
              //     await updateCatMutation();
                  setDisplay(false)
              //   }
              //   catch (err) {
              //     console.log(err);
              //   } 
                
              }
            }></input>
          </form>
          // </ErrorBoundary>
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
