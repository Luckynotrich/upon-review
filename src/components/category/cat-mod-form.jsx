import React, { useEffect, useContext, useRef, useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { useCatsQuery } from '../contexts/current-cats-context';
import { updateCat } from '../../utils/future-self-api';

import { katObj } from '../../utils/kat-obj';
import UserContext from '../contexts/user-context';
import { Container } from '@mui/material';

export default function CatModForm({ catId }) {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { data: cats } = useCatsQuery(userId);
  let catIndex = cats.findIndex((cat) => cat.id === catId);

  const _cat = useRef();
  _cat.current = katObj(cats[catIndex]);

  let cat = {
    catId: _cat.current.id,
    pros: [],
    cons: [],
  };
  cat.pros = _cat.current.pros.map((pro) => pro.value);
  cat.cons = _cat.current.cons.map((con) => con.value);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful, isLoading },
    reset,
  } = useForm({
    defaultValues: {
      catId: cat.catId,
      pros: cat.pros,
      cons: cat.cons,
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

  const updateCatMutation = useMutation({
    mutationFn: (data) => {
      updateCat(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('cats');
      runDontWalk('onSuccess'), reset();
    },
    onError: (error) => {
      console.log('error: ', error);
      runDontWalk('onError');
    },
    onSettled: async () => {
      return runDontWalk('onSettled');
    },
  });
  async function runDontWalk(Caller) {
    while (true) {
      console.log('Running...');
      await new Promise((resolve) => setInterval(resolve, 1000));
      console.log('sent by ', Caller);
      return navigate('/');
    }
  }
  useEffect(() => {
    console.log('isSubmitSuccessful ', isSubmitSuccessful);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, cats, isSubmitSuccessful]);

  return (
    <>
      {_cat.current.name && (
        <>
          <h5 key={'title'}>
            <span className="alt-color-2" style={{ fontSize: '1.5rem' }}>
              {_cat.current.name}
            </span>{' '}
            &nbsp; &nbsp; add likes and dislikes (optional)
          </h5>

          <Container key={'Container'}>
            <form
              onSubmit={handleSubmit(async (data) =>
                updateCatMutation.mutateAsync(data),
              )}
              encType="multipart/form-data"
              method="put"
              action="send"
              id="category"
              key={'catForm'}
            >
              <input
                type="text"
                readOnly
                value={cat.catId}
                hidden
                key={cat.catId}
              />
              <section style={{ display: 'flex', margin: '.3rem' }}>
                <h4 key={'likes'}className="right">Likes</h4>
                <input
                  type="submit"
                  id="submitButton"
                  key={cat.toString()}
                  className="create"
                  defaultValue="Create"
                ></input>
              </section>
              <fieldset>
                {proFields.map((item, index) => {
                  return (
                    <section key={index+5} style={{ display: 'flex', flex: 'nowrap' }}>
                      <input
                        {...register(`pros.${index}`)}
                        type="text"
                        className="center"
                        placeholder="I like..."
                      />

                      <button
                        className="inputBtn material-symbols-outlined deleteBtn"
                        type="buton"
                        key={`pros.${(index + 10)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          proRemove(index);
                        }}
                      >
                        delete
                      </button>
                    </section>
                  );
                })}
                <button
                  type="button"
                  key={cat.pros.length + 100}
                  className="inputBtn appendBtn material-symbols-outlined"
                  onClick={() => proAppend('')}
                >
                  add_box
                </button>
              </fieldset>
              <h4 className="right dislike">Dislikes</h4>

              <fieldset>
                {conFields.map((item, index) => {
                  return (
                    <section key={index+5} style={{ display: 'flex', flex: 'nowrap' }}>
                      <input
                        {...register(`cons.${index}`)}
                        type="text"
                        className="center"
                        placeholder="I don't like..."
                      />

                      <button
                        className="inputBtn material-symbols-outlined deleteBtn"
                        type="button"
                        key={`cons.${(index + 10)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          conRemove(index);
                        }}
                      >
                        delete
                      </button>
                    </section>
                  );
                })}
                <button
                  type="button"
                  className="inputBtn appendBtn material-symbols-outlined"
                  key={cat.cons.length + 100}
                  onClick={() => conAppend('')}
                >
                  add_box
                </button>
              </fieldset>
            </form>
          </Container>
        </>
      )}
    </>
  );
}
