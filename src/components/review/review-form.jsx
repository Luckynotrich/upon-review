import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import ReviewContext from '../contexts/review-context';
import StarRating from './star_rating_rhf';
import CheckList from './check-list';

function ReviewForm({ catState, setCatState }) {
  const { name ,pros, cons, id } = catState;
  const navigate = useNavigate();
  const date = new Date();
  const defaultDate = date.toLocaleDateString('en-CA');

  const [prosExist, setProsExist] = useState(false);
  const [consExist, setConsExist] = useState(false);

  const {
    catId,
    setRevName,
    setRevURL,
    setRevDate,
    revRating,
    setRevRating,
    setReviewTxt,
  } = useContext(ReviewContext);

  const {
    register,
    control,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      catId: id,
      revName: '',
      revURL: '',
      revDate: defaultDate,
      revRating: 0,
      revText: '',
      propArray: [0],
    },
  });

  let error;
  const queryClient = useQueryClient();
  const reviewMutation = useMutation({
    mutationFn: (data) => {
      axios.post('http://localhost:8081/api/review-api/addNew',data,{headers: { 'Content-Type': 'multipart/form-data' }});
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(['revs', id],async (oldData) => oldData?{...oldData, data}:await data);
      runDontWalk(`reviewMutation.onSuccess`);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('revs');
      runDontWalk(`reviewMutation.onSettled`);
    }
  });

  async function runDontWalk(Caller) {  
    while (true) {  
      console.log('Running...');  
      await new Promise(resolve => setInterval(resolve, 1000));  
    return navigate('/') 
    }  
  }
  
  useEffect(() => {
    setProsExist(false);
    setConsExist(false);
    if (pros.length > 0) {
      setProsExist(true);
    }
    if (cons.length > 0) {
      setConsExist(true);
    }
  }, [pros, cons]);

  useEffect(() => {
    setRevRating(0);
  }, []);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      setCatState('');
    }
  }, [formState, reset]);

  return (
    <>
     <h5 key={"title"}>
            <span className="alt-color-1"style={{fontSize: '1.5rem' }}>
              {name}
            </span>{' '}
            &nbsp; &nbsp; is the category for this review 
          </h5>
    <form
      onSubmit={handleSubmit(reviewMutation.mutateAsync)}
      encType="multi-part/form"
      method="post"
      action="send"
      id="review"
    >
      <div className="barrier"></div>
      <fieldset>
        <input type="hidden" {...register('catId')} value={id} readOnly/>
        <div className="row">
          <label htmlFor="RevName">Name</label>
          <input
            name="revName"
            {...register('revName', { required: true })}
            id="RevName"
            type="text"
            autoComplete="on"
            aria-describedby="name"
            placeholder="Enter Name"
            onChange={(e) => setRevName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="RevDate">Date&nbsp;&nbsp;</label>
          <input
            name="revDate"
            {...register('revDate')}
            id="RevDate"
            className="date"
            type="date"
            defaultValue={defaultDate}
            onChange={(e) => setRevDate(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="RevURL">URL &nbsp;&nbsp;&nbsp;</label>
          <input
            name="revURL"
            {...register('revURL')}
            id="RevURL"
            placeholder="Web url"
            type="text"
            autoComplete="on"
            onChange={(e) => setRevURL(e.target.value)}
          />
        </div>
        <div>
          <StarRating
            control={control}
            name="revRating"
            rating={revRating}
            setRevRating={setRevRating}
          />
        </div>
      </fieldset>
      {prosExist && pros.length > 0 && pros[0].value != null && (
        <CheckList
          control={control}
          propArr={pros}
          propArrCount={0}
          name={'Likes'}
        />
      )}

      {consExist && cons.length > 0 && cons[0].value != null && (
        <CheckList
          control={control}
          propArr={cons}
          propArrCount={pros.length}
          name={'Dislikes'}
        />
      )}

      <fieldset>
      <button type="submit" id={'reviewSubmit'}>
          Submit
        </button>
        <label htmlFor="revText">Review</label>
        <textarea
        style={{width:'100%'}}
          {...register('revText')}
          columns=""
          rows="15"
          className="center"
          id="revText"
          placeholder="Write Something..."
          onChange={(e) => setReviewTxt(e.target.value)}
        />
      
      </fieldset>
      {/* </div> */}
    </form>
    </>
  );
}
export default ReviewForm;
