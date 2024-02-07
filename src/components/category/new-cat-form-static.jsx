import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCatsQuery } from '../contexts/current-cats-context.jsx';
import { useNavigate } from "react-router-dom";

import axios from '../../utils/future-self-api.js';

const NewCatForm = ({ catName, userId }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);

  let cons = [];
  let pros = [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful, isLoading },
    reset,
  } = useForm(
    {
      defaultValues: {
        name: catName,
        userId: userId,
        pros: (pros = ['', '', '', '', '']),
        cons: (cons = ['', '', '', '', '']),
      },
    },
    { mode: 'onChange' },
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

  const { data: cats } = useCatsQuery(userId);
  const createCatMutation = useMutation({
    mutationFn: (data) => {
      axios.post('api/category-api/addNew/?', data);
    }, 
    onSucess: (data) => {
      queryClient.setQueryData(['cats'], (oldData) =>
        oldData ? { ...oldData, data } : data,
        runDontWalk('onSuccess'),
        reset(),
      );
    },
    onError: (error) => {
      runDontWalk('onError')
    },
    onSettled: async () => {
      return runDontWalk('onSettled')
    },
  });

async function runDontWalk(Caller) {  
  while (true) {  
    console.log('Running...');  
    await new Promise(resolve => setInterval(resolve, 1000));  
    console.log('sent by ', Caller);
  return navigate('/') 
  } 
  
}
  return (
    <>
      {catName && display && (
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
            hidden={!display}
            method="post"
            action="send"
            onSubmit={handleSubmit((data) => createCatMutation.mutateAsync(data))}
          >
            <h4 className="left">Likes</h4>
            <fieldset>
              <input
                {...register(`pros.0`)}
                type="text"
                className="center"
                placeholder="I like..."
              />
              <input
                {...register(`pros.1`)}
                type="text"
                className="center"
                placeholder="I like..."
              />
              <input
                {...register(`pros.2`)}
                type="text"
                className="center"
                placeholder="I like..."
              />
              <input
                {...register(`pros.3`)}
                type="text"
                className="center"
                placeholder="I like..."
              />
              <input
                {...register(`pros.4`)}
                type="text"
                className="center"
                placeholder="I like..."
              />
            </fieldset>
            <h4 className="left">Dislikes</h4>
            <fieldset>
              <input
                {...register(`cons.0`)}
                type="text"
                className="center"
                placeholder="I don't like..."
              />
              <input
                {...register(`cons.1`)}
                type="text"
                className="center"
                placeholder="I don't like..."
              />

              <input
                {...register(`cons.2`)}
                type="text"
                className="center"
                placeholder="I don't like..."
              />
              <input
                {...register(`cons.3`)}
                type="text"
                className="center"
                placeholder="I don't like..."
              />
              <input
                {...register(`cons.4`)}
                type="text"
                className="center"
                placeholder="I don't like..."
              />
            </fieldset>
            <button
              type="submit"
              onClick={() => {
                // setDisplay(false);
                runDontWalk('onClick')
              }}
              className="create"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default NewCatForm;
