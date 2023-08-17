import React, { useContext } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm, Controller } from 'react-hook-form';
import SelectedDataContext from '../contexts/selected-data-context';

import CheckBox from './check-box';
import StarRating from './star_rating';
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
    console.log('reviw data ', data);
    //  await axios.post('/api/review-api/addNew', { data, catId, error });
  };
  const toggleValue = (value) => {
    console.log('toggle value ', value);
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
            <label htmlFor="RevName">Name</label>
            <Controller
              name="revName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="RevName"
                  type="text"
                  autoComplete="on"
                  aria-describedby="name"
                  placeholder="Enter Name"
                  required={true}
                />
              )}
              onChange={(e) => setRevName(e.target.value)}
            />
          </div>
          <div className="row">
            <label htmlFor="RevURL">URL &nbsp;</label>
            <Controller
              name="revURL"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="RevURL"
                  placeholder="Web url"
                  type="text"
                  autoComplete="on"
                />
              )}
              onChange={(e) => setRevURL(e.target.value)}
            />
          </div>
          <div className="row">
            <label htmlFor="RevDate">Date&nbsp;&nbsp;</label>
            <Controller
              name="revDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="RevDate"
                  className="date"
                  type="date"
                />
              )}
              onChange={(e) => setRevDate(e.target.value)}
            />
          </div>
          <div>
            <Controller
              name="revRating"
              control={control}
              render={(field) => (
                <StarRating
                  {...field}
                  rating={revRating}
                  setReviewRating={setRevRating}
                  size={30}
                />
              )}
              onChange={(e) => setRevRating(e.target.value)}
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
                    <label forHtml={prop.id} value={prop.id} className="checkbox">
               <Controller
                name={`pros${i}`}
                control={control}
                render={(field) => (
                  <input
                    {...field}
                    type="checkbox"
                     className="checkbox"
                     id={prop.id}
                     toggleProp={toggleProp}
                     key={prop.id}
                    //  prefArr={prop[i]}
                    //  onClick={()=>  isItemSelected(prop.id)}
                  />
                )}
                onChange={() =>{
                  toggleProp(prop.id)
                  // value=prop.value?prop.value:prop.id
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
              <Controller
                name={`cons${i}`}
                control={control}
                render={(field) => (
                  <CheckBox
                    {...field}
                    id={prop.id}
                    text={prop.value}
                    toggleProp={toggleProp}
                    key={prop.id}
                    prefArr={prop[i]}
                  />
                )}
                onChange={(e) => toggleValue(e.target.value)}
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
              render={({ field }) => <textarea {...field} 
              columns=""
              rows="27"
              id="revText"
              placeholder="Write Something..."
              />}
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
