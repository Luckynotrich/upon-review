import React, {
  createContext,
  useContext,
  useState
} from 'react';
import SelectedDataContext from './selected-data-context';
import {postReview} from '../../post_review';

const ReviewContext = createContext();
const ReviewContextProvider = ({ children }) => {
  const [catId, setCatId] = useState();
  const [revName, setRevName] = useState('');
  const [revURL, setRevURL] = useState();
  const [revDate, setRevDate] = useState();
  const [revRating, setRevRating] = useState(0);
  const [reviewTxt, setReviewTxt] = useState();
  const { propArray } = useContext(SelectedDataContext);
  const [reviews, setReviews] = useState([]);
    
  const handleSubmit = () => {
   const newReview = postReview(
      catId,
      revName,
      revURL,
      revDate,
      revRating,
      reviewTxt,
      propArray,
    );
    setReviews([...reviews, newReview]);
    // console.log(
    //   'catId:',
    //   newReview.catId,
    //   'name: ',
    //   newReview.revName,
    //   'URL: ',
    //   newReview.revURL,
    //   'Date: ',
    //   newReview.revDate,
    //   'Rating: ' + newReview.revRating,
    //   'Review: ',
    //   newReview.reviewTxt,
    //   'Selected',
    //   newReview.propArray,
    // );
  };

  const providerProps = {
    reviews,
    setReviews,
    handleSubmit,
    setCatId,
    setRevName,
    setRevURL,
    setRevDate,
    revRating,
    setRevRating,
    setReviewTxt,
  };

  return (
    <ReviewContext.Provider value={providerProps}>
      {children}
    </ReviewContext.Provider>
  );
};
export { ReviewContextProvider };
export default ReviewContext;
