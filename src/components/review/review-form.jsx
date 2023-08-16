import React, { useContext } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm, Controller } from 'react-hook-form';
import SelectedDataContext  from "../contexts/selected-data-context";

import CheckBox from './check-box';
import StarRating from './star_rating';
import axios from '../../utils/future-self-api';

function ReviewForm({ pros, cons }) {
  const date = new Date();
  const defaultDate = date.toLocaleDateString('en-CA');
  const {toggleProp} = useContext(SelectedDataContext)


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
      // pros: [''],
      // cons: [''],
    },
  });
  let error;
  const onSubmit = async (data) => {
    console.log('reviw data ',data);
    //  await axios.post('/api/review-api/addNew', { data, catId, error });
  };

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
            <label htmlFor="name">Name</label>
            <Controller
              name="revName"
              control={control}
              render={({ field }) => <input {...field} />}
              type="text"
              autoComplete="off"
              onChange={(e) => setRevName(e.target.value)}
              aria-describedby="name"
              id="revName"
              placeholder="Enter Name"
              required={true}
            />
          </div>
          <div className="row">
            <label htmlFor="revURL">URL &nbsp;</label>
            <Controller
              name="revURL"
              control={control}
              render={({ field }) => <input {...field} />}
              type="text"
              autoComplete="off"
              onChange={(e) => setRevURL(e.target.value)}
              id="revURL"
              placeholder="Web url"
            />
          </div>
          <div className="row">
            <label htmlFor="revDate">Date&nbsp;&nbsp;</label>
            <Controller
              name="revDate"
              control={control}
              render={({ field }) => <input {...field} />}
              type="date"
              defaultValue={defaultDate}
              onChange={(e) => setRevDate(e.target.value)}
              // id="revDate"
              className="date"
            />
          </div>
          <div>
            <Controller
              name="revRating"
              control={control}
              render={(field) => <StarRating {...field}
               rating={revRating}
              setReviewRating={setRevRating} />}
              size={30}
              
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
              <Controller
                name={`pros${i}`}
                control={control}
                render={(field) => <CheckBox {...field} id={prop.id} text={prop.value} toggleProp={toggleProp} />}
                key={prop.id}                
                prefArr={prop[i]}
                onChange={(e) => field.value= prop.id}
              />
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
              <Controller
                name={`cons${i}`}
                control={control}
                render={(field) => <CheckBox {...field} id={prop.id} text={prop.value} toggleProp={toggleProp} />}
                key={prop.id}                
                prefArr={prop[i]}
              />
            ))}
          </div>
        </fieldset>
        <div className="container">
          <fieldset>
            <label htmlFor="revText">Review</label>
            <Controller
              name="revText"
              control={control}
              render={({ field }) => <textarea {...field} />}
              columns=""
              rows="27"
              onChange={(e) => setReviewTxt(e.target.value)}
              id="revText"
              placeholder="Write Something..."
            />
            <button type="submit">Submit</button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
