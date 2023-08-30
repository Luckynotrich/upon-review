import React, { useContext, useEffect } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm } from 'react-hook-form';
import SelectedDataContext from '../contexts/selected-data-context';

import StarRating from './star_rating_rhf';
import axios from '../../utils/future-self-api';

function ReviewForm({ pros, cons }) {
  const date = new Date();
  const defaultDate = date.toLocaleDateString('en-CA');
  const { toggleProp } = useContext(SelectedDataContext);

  const { isItemSelected } = useContext(SelectedDataContext);

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
      revRating: '',
      revText: '',
      propArray: [],
    },
  });

  let error;
  const onSubmit = async (data) => {
    console.log('reviw data ', data);
    await axios.post('/api/review-api/addNew', { data, catId, error });
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
      <div className="right-75">
        <fieldset>
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
          ''
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
          <div>
            
            <StarRating
              control={control}
              name="revRating"
              size={30}
              rating={revRating}
              setReviewRating={setRevRating}
            />
           
          </div>
        </fieldset>
        <fieldset>
          <div className="row">
            <div className="right-90">
              <h2>Pros</h2>
            </div>
          </div>
          <div className="left-25">
            {pros.map((prop, i) => (
              <div className="row">
                <div className="right-75">
                  <label
                    key={prop.id + 1}
                    htmlFor={'prosChecked'}
                    value={prop}
                    className="checkbox"
                  >
                    <input
                      {...register('propArray')}
                      type="checkbox"
                      className="checkbox"
                      id={prop.id}
                      key={prop.id}
                      value={prop.id}
                      onClick={() => isItemSelected(prop.id)}
                      onChange={() => {
                        toggleProp(prop.id);
                      }}
                    />
                    <span className="checkbox">{prop.value}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <div className="row">
            <div className="right-90">
              <h2>Cons</h2>
            </div>
          </div>
          <div className="left-25">
            {cons.map((prop, i) => (
              <div className="row">
                <div className="right-75">
                  <label
                    key={prop.id + 1}
                    htmlFor={'consChecked'}
                    value={prop}
                    className="checkbox"
                  >
                    <input
                      {...register('propArray')}
                      type="checkbox"
                      className="checkbox"
                      id={prop.id}
                      value={prop.id}
                      key={prop.id}
                      onClick={() => isItemSelected(prop.id)}
                      onChange={() => {
                        toggleProp(prop.id);
                      }}
                    />
                    <span className="checkbox">{prop.value}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="container">
          <fieldset>
            <label htmlFor="revText">Review</label>
            <textarea
              {...register('revText')}
              columns=""
              rows="27"
              id="revText"
              placeholder="Write Something..."
              onChange={(e) => setReviewTxt(e.target.value)}
            />
            <button type="submit">Submit</button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
