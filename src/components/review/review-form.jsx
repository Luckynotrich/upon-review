import React, { useContext, useEffect, useState } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm } from 'react-hook-form';
import SelectedDataContext from '../contexts/selected-data-context';

import StarRating from './star_rating_rhf';
// import CheckBox from './checkbox_rhf';
import axios from '../../utils/future-self-api';
import CheckList from './check-list';


function ReviewForm({ pros, cons, /* catState, */ setCatState }) {
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
      revName: '',
      revURL: '',
      revDate: defaultDate,
      revRating: 0,
      revText: '',
      propArray: [0],
    },
  });

  let error;
 
  const onSubmit = async (data) => {
     await axios.post('/api/review-api/addNew', { data, catId, error });
  };
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
      setCatState('')
    }
  }, [formState, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, error)}
      encType="multi-part/form"
      method="post"
      action="send"
      id="review"
    >
      <div className="barrier"></div>
      <fieldset>
        <div className="row">
          <label htmlFor="RevName">Name</label>
          <input
            name="revName"
            {...register('revName', { required: true })}
            id="RevName"
            type="text"
            autoComplete="on"
            // className="center"
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
          <label htmlFor="RevURL">URL &nbsp;</label>
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
      {(prosExist && pros.length > 0 && pros[0].value != null) && (
        <CheckList
          control={control}
          propArr={pros}
          propArrCount={0}
          name={'Likes'}
        />
      )}
      
      
      {(consExist && cons.length > 0 && cons[0].value != null ) && (
        <CheckList
          control={control}
          propArr={cons}
          propArrCount={pros.length}
          name={'Dis-likes'}
        />
      )}
      
      {/* <div className="container"> */}
        <fieldset>
          <label htmlFor="revText">Review</label>
          <textarea
            {...register('revText')}
            columns=""
            rows="27"
            className="center"
            id="revText"
            placeholder="Write Something..."
            onChange={(e) => setReviewTxt(e.target.value)}
          />
          <button type="submit" onClick={()=>{setRevRating(0)}}>Submit</button>
        </fieldset>
      {/* </div> */}
    </form>
  );
}

export default ReviewForm;
