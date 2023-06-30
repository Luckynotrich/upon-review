import React, { useState, /* useEffect, useRef, */ useContext } from 'react';
import axios from 'axios';
import Header from './header';
import Select from './select';
import GetReview from './get-review';
import SelectedDataContext from '../contexts/selected-data-context';
import ReviewContext from '../contexts/review-context';
import CategoryContext from '../contexts/category-context';

const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';

const ReviewForm = () => {
  const { clearPropArray } = useContext(SelectedDataContext);
  const { setCatId } = useContext(ReviewContext);
  const { categories } = useContext(CategoryContext);
  const [catState, setCatState] = useState('');

  // let _categories = useRef()
  // let isSubscribed = useRef(true);

  //   useEffect(() => {
  //     async function GetCats() {

  //       try{
  //       let response = await axios.get("/api/category-api/" + userId);
  //          _categories.current = await response.data
  //          setCategories(_categories.current);
  //         }
  //         catch(error){
  //           console.log(error)
  //         }
  //     return () => (isSubscribed.currentValue = false)
  //   }

  //     GetCats();

  // }, []);

  const chooseCat = (e) => {
    const id = Number(e.target.value);

    const selectedCat = categories.filter((cat) => cat.id === id)[0];

    if (selectedCat) {
      clearPropArray();
      setCatId(id);
      setCatState(selectedCat);
    }
  };

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
