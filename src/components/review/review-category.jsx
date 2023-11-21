import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/user-context';
import Header from '../header';
import Select from './select';
import ReviewForm from './review-form';
import SelectedDataContext from '../contexts/selected-data-context';
import ReviewContext from '../contexts/review-context';
import { useCategoriesQuery} from '../contexts/current-categories-context';

const ReviewCategory = () => {
  const { clearPropArray } = useContext(SelectedDataContext);
  const { setCatId } = useContext(ReviewContext);
  const [catState, setCatState] = useState('');
  const { userId } = useContext(UserContext);
  const {data: cats} = useCategoriesQuery(userId);
  
  

  const chooseCat = (e) => {
    const id = Number(e.target.value);
    const selectedCat = cats.filter((cat) => cat.id === id)[0];
    if (selectedCat) {
      clearPropArray();
      setCatId(id);
      setCatState(selectedCat);
    }
  };
  
let i = 0;
  return (
    <>
    <Header ID={'review-title'} title={'Review'}/>
    <div className="container">
      
      <form>
        {cats.length > 0 ? (
          <Select
            categories={cats}
            onSelect={chooseCat}
            key={cats.id}
            onClick={() => {setCatState(''); setCatId(0); clearPropArray();}}
          />
        ) : (
          ' Categories currently unavailable. Please check the internet connection and refresh the browser'
        )}
      </form>

      {catState && <ReviewForm pros={catState.pros} cons={catState.cons} setCatState={setCatState}/>}
    </div>
    </>
  );
};

export default ReviewCategory;
