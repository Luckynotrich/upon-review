import React, { useContext, useEffect } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm/* , useController  */} from 'react-hook-form';
import SelectedDataContext from '../contexts/selected-data-context';

import StarRating from './star_rating_rhf';
import CheckBox from './checkbox_rhf';
import axios from '../../utils/future-self-api';

function ReviewForm({ pros, cons }) {
  const date = new Date();
  const defaultDate = date.toLocaleDateString('en-CA');
  const { toggleProp,isItemSelected } = useContext(SelectedDataContext);
  

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

  let error, i = 0;
  const onSubmit = async (data) => {
    console.log('reviw data ', data);
    // await axios.post('/api/review-api/addNew', { data, catId, error });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
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
              // className="center"
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
              // size={30}
              rating={revRating}
              setReviewRating={setRevRating}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="row">
            <div className="procon-label">
              <h4>Pros</h4>
            </div>
          </div>
          <div className="left-25">
            {pros.map((prop) => (
              <CheckBox
              control={control}
              name={`propArray[${i++}]`}
              prop={prop}
              key={prop.id}
            />
            ))}
          </div>
        </fieldset>
        <fieldset>
          <div className="row">
            <label htmlFor='cons' className="procon-label">
              <h4>Cons</h4>
            </label >
          
          <div id='cons'className="left-25">
            {cons.map((prop) => (
              <CheckBox
              control={control}
              name={`propArray[${i++}]`}
              prop={prop}
              key={prop.id}
              // setReviewRating={setRevRating}
            />
            ))}
            </div>
          </div>
        </fieldset>
        <div className="container">
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
            <button type="submit">Submit</button>
          </fieldset>
        </div>
    </form>
  );
}

export default ReviewForm;
