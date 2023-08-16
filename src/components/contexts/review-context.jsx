import React, {
  createContext,
  useContext,
  useState
} from 'react';
import SelectedDataContext from './selected-data-context';
import  {postReview} from '../../utils/get-reviews';


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
      };
// const refreshReviews = async () => {setReviews(await getReview(catId))};
  const providerProps = {
    reviews,
    setReviews,
    /* refreshReviews, */
    handleSubmit,
    catId,
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
