import React, { useEffect, useContext, useRef } from 'react';
import { useForm, useFieldArray, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';

// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from '../../utils/error-fallback';
import CategoryContext from './src/components/contexts/category-context';
import { catObj } from './src/utils/cat-obj';

import {updateCat} from './src/utils/future-self-api';

export function CatForm(catId, mutateAsync) {
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
  const onSubmit = async (data, error) => {
    await updateCategory(catId, data);
    await setLoading(true);
    await mutateAsync(data, catId);  
  };
  const { mutateAsync } = useMutation({
    mutationFn: updateCat(data, catId),
    onSuccess: () => {
      QueryClient.invalidateQueries('cats')
    }});
  
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
          // <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                    <Controller
                    render={({ field }) => {
                    <input
                      {...register(`pros.${index}.value`)}
                      type="text"
                      className="center"
                      placeholder="I like..."
                    />
                    }
                    // />
                }
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
          // {/* </ErrorBoundary> */}
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
