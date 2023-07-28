import React, { useState, useEffect, useRef, useContext } from 'react';
import Header from './header';
import Select from './select';
import GetReview from './get-review';
import SelectedDataContext from '../contexts/selected-data-context';
import ReviewContext from '../contexts/review-context';
import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';
import axios from '../../utils/_axios-programming-interface.js';

const ReviewForm = () => {
  const { clearPropArray } = useContext(SelectedDataContext);
  const { setCatId } = useContext(ReviewContext);
  const { categories, setCategories } = useContext(CategoryContext);
  const { userId } = useContext(UserContext);
  const [catState, setCatState] = useState('');
  let _categories = useRef();
  let _reviews = useRef();
  let isSubscribed = useRef(true);

  useEffect(async () => {
    async function getData(userId) {
      try {
          let response = await axios.get('/api/category-api/' + userId);
          _categories.current = await response.data;
          if (_categories.current.length > 0) {
              console.log("useEffect categories", _categories.current);
              await setCategories(_categories.current);
          //     response = await axios.get('/api/review-api/' + userId);
          //     _reviews.current = await response.data;
          //     if (_reviews.current.length > 0) setReviews(_reviews.current);
          // }else{
          //     console.log("no categories");
           }
      } catch (error) {
          console.log(error);
      }
      return () => (isSubscribed.currentValue = false);
  }
   
    getData(userId);
  }, []);

  const chooseCat = (e) => {
    const id = Number(e.target.value);
    const selectedCat = categories.filter((cat) => cat.id === id)[0];

    if (selectedCat) {
      clearPropArray();
      setCatId(id);
      setCatState(selectedCat);
    }
  };
  
let i = 0;
  return (
    <div className="container">
      <Header />
      <form>
        {categories.length > 0 ? (
          <Select
            categories={categories}
            onSelect={chooseCat}
            key={categories.id}
          />
        ) : (
          ' Categories currently unavailable. Please check the internet connection and refresh the browser'
        )}
      </form>

      {catState && <GetReview pros={catState.pros} cons={catState.cons} />}
    </div>
  );
};

export default ReviewForm;
