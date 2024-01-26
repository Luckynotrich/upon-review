import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createCat } from '../../utils/future-self-api.js';

const NewCatForm = ({ catName, userId }) => {
   let cons= [];//[" "," "," "," "," "];
  let pros= [];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful, isLoading },
    reset,
  } = useForm(
    {
      defaultValues: {
        name: catName, userId: userId,
        pros: pros =[" "," "," "," "," "],
        cons: cons=[" "," "," "," "," "],
      },
    },
    { mode: 'onChange' }
  );
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
  
  const [YELLOW] = useState('#FAFA37');
  const queryClient = useQueryClient();

  
  const createCatMutation = useMutation({
    mutationFn: (data) => createCat(data), //SendData.post('api/category-api/addNew/?', { /* data, */ userId }),//
    // onSucess: () => {
    //   setCatId(data);
    //   queryClient.invalidateQueries({
    //     queryKey: ['cats', userId],
    //   });
    // },
  });
  
  return (
    <>
      {catName && (
        <>
          <h5>
            <span style={{ color: '#FAFA37', fontSize: '1.5rem' }}>
              {catName}
            </span>{' '}
            &nbsp; &nbsp; add likes and dislikes (optional)
          </h5>
        </>
      )}
      <div className="container">
        {catName && (
          <form
            encType="multipart/form-data"
            method="post"
            action='send'
            onSubmit={handleSubmit((data)=>  createCatMutation.mutate(data))}
          >
            
            <h4 className="left">Likes</h4>
            <fieldset>
            {proFields.map((item, index) => {
                return (
                    <input
                      {...register(`pros.${index}`)}
                      type="text"
                      className="center"
                      placeholder="I like..."
                    />
                    );
              })}
             
            </fieldset>
            <h4 className="left">Dis-likes</h4>
            <fieldset>
            {conFields.map((iitem, index) => {
                return (
                    <input
                      {...register(`cons.${index}`)}
                      type="text"
                      className="center"
                      placeholder="I don't like..."
                    />
                );
              })}
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default NewCatForm;
