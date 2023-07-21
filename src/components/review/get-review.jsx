import React, {useContext} from "react"
import ReviewContext from "../contexts/review-context";

import CheckList from "./check-list";
import StarRating from "./star_rating";

function GetReview({ pros, cons }) {
  const {handleSubmit, setRevName, setRevURL, setRevDate, revRating, setRevRating, setReviewTxt} = useContext(ReviewContext)
  const date = new Date();
  const defaultValue = date.toLocaleDateString('en-CA');
 
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="right-75">
        <fieldset>
          <div className="row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) => setRevName(e.target.value)}
              aria-describedby="name"
              id="name"
              name="name"
              placeholder="Enter Name"
              required={true}
            ></input>
          </div>
          <div className="row">
            <label htmlFor="revURL">URL &nbsp;</label>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) => setRevURL(e.target.value)}
              id="revURL"
              name="URL"
              placeholder="Web url"
              /* required={false} */
            ></input>
          </div>
          <div className="row">
            <label htmlFor="revDate">Date&nbsp;&nbsp;</label>
            <input
              type="date"
              defaultValue={defaultValue}
              onChange={(e) => setRevDate(e.target.value)}
              id="revDate"
              name="date"
              className="date"
            ></input>
          </div>
          <div>
            <StarRating size={30} rating={revRating} setReviewRating={setRevRating} />
          </div>
        </fieldset>
        <fieldset>
          
            <CheckList name='Pros' propArray={pros} />
            <CheckList name='Cons' propArray={cons} />
          
        </fieldset>
        <div className="container">
          <fieldset>
            <label htmlFor="revText">Review</label>
            <textarea
              columns=""
              rows="27"
              onChange={e => setReviewTxt(e.target.value)}
              id="revText"
              name="review"
              placeholder="Write Something..."
            ></textarea>
            <button type='submit'>Submit</button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default GetReview;
