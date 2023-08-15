import React, { useContext } from 'react';
import ReviewContext from '../contexts/review-context';
import { useForm, Controller } from 'react-hook-form';
import SelectedDataContext  from "../contexts/selected-data-context";

import CheckBox from './check-box';
// import CheckList from './check-list';
import StarRating from './star_rating';

function ReviewForm({ pros, cons }) {
  const date = new Date();
  const defaultDate = date.toLocaleDateString('en-CA');
  // const {toggleProp} = useContext(SelectedDataContext)


  const {
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
      pros: [''],
      cons: [''],
    },
  });
  let error;
  const onSubmit = async (data) => {
    // await axios.post('/api/review-api/addNew', { data, catId, error });
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
              id="revDate"
              className="date"
            />
          </div>
          <div>
            <Controller
              name="revRating"
              control={control}
              render={(field) => <StarRating {...field} />}
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
              <Controller
                name={`pros${i}`}
                control={control}
                render={(field) => <CheckBox {...field} />}
                text={prop.value}
                key={prop.id}
                id={prop.id}
                prefArr={pros[i]}
              />
            ))}
          </div>

          {/* <Controller
          name="Pros"
          control={control}
          render={(field)=><CheckList{...field} />} 
          propArray={pros}
          />
          <Controller
          name="Cons"
          control={control}
          render={(field)=><CheckList{...field}   />}
          propArray={cons}
          /> */}
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
