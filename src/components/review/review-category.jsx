import React, { useState, useContext, useEffect } from 'react';
import Header from '../header';
import Select from './select';
import ReviewForm from './review-form';
import SelectedDataContext from '../contexts/selected-data-context';
import ReviewContext from '../contexts/review-context';
import CategoryContext from '../contexts/category-context';


const ReviewCategory = () => {
  const { clearPropArray } = useContext(SelectedDataContext);
  const { setCatId } = useContext(ReviewContext);
  const { categories} = useContext(CategoryContext);
  const [catState, setCatState] = useState('');
  
    

  const chooseCat = (e) => {
    const id = Number(e.target.value);
    const selectedCat = categories.filter((cat) => cat.id === id)[0];
    if (selectedCat) {
      clearPropArray();
      setCatId(id);
      setCatState(selectedCat);
    }
  };
  //  useEffect(() => {console.log('catState: ', catState);}, [catState]);
let i = 0;
  return (
    <div className="container">
      {/* <Header ID={'review-title'} title={'Review'}/> */}
      <form>
        {categories.length > 0 ? (
          <Select
            categories={categories}
            onSelect={chooseCat}
            key={categories.id}
            onClick={() => {setCatState(''); setCatId(0); clearPropArray();}}
          />
        ) : (
          ' Categories currently unavailable. Please check the internet connection and refresh the browser'
        )}
      </form>

      {catState && <ReviewForm pros={catState.pros} cons={catState.cons} setCatState={setCatState}/>}
    </div>
  );
};

export default ReviewCategory;
