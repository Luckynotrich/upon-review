import React, { useState, useContext, useEffect } from 'react';

import UserContext from '../contexts/user-context';
import SelectedDataContext from '../contexts/selected-data-context';
import ReviewContext from '../contexts/review-context';
import CategoryContext from '../contexts/category-context';
import { useCatsQuery} from '../contexts/current-cats-context';

import Header from '../header';
import Select from './select';
import ReviewForm from './review-form';



const ReviewCategory = () => {
  const { clearPropArray } = useContext(SelectedDataContext);
  const { setCatId } = useContext(ReviewContext);
  const { setCategories } = useContext(CategoryContext);
  const { userId } = useContext(UserContext);
  
  const [catState, setCatState] = useState('');

  const {data: cats} = useCatsQuery(userId);
  useEffect(() => {setCategories(cats)}, [cats]);

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
