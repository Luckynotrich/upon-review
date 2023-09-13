import React, { useState, useContext, useRef, useEffect } from 'react';
import CategoryContext from './contexts/category-context';
import ReviewContext from './contexts/review-context';
// import getCategories from '../utils/get-categories';
// import Header from './header';

import UserContext from './contexts/user-context';

import axios from '../utils/future-self-api.js';

function ShowReview() {
  const { categories, setCategories } = useContext(CategoryContext);
  const { reviews, setReviews } = useContext(ReviewContext);
  const { userId } = useContext(UserContext);
  let _categories = useRef();
  let _reviews = useRef();
  let isSubscribed = useRef(true);
  let [gotCats, setGotCats] = useState('');

  useEffect(async () => {
    async function getData(userId) {
      try {
        let response = await axios.get('/api/category-api/' + userId);
        setGotCats('...loading');
        _categories.current = await response.data;
        if (_categories.current.length > 0) {
          console.log('show-review categories', _categories.current);
          await setCategories(_categories.current);
          response = await axios.get('/api/review-api/' + userId);
          _reviews.current = await response.data;
          if (_reviews.current.length > 0) {
            setReviews(_reviews.current);
            console.log('show-review categories', _categories.current);
          }
        } else {
          console.log('no categories');
          setGotCats('No categories yet. Please add a category');
        }
      } catch (error) {
        console.log(error);
      }
      return () => (isSubscribed.currentValue = false);
    }
    getData(userId);
  }, []);

  return (
    <div>
      {/* <Header ID={'show-view-title'} title={'View'}/> */}
      {/* <h1 className="show-view-title">View</h1> */}
      <div className='categorTree'>
        {categories.length > 0 ? (
          categories.map((category) => {
            return <h4 key={category.id}>{category.name}</h4>;
          })
        ) : (
          <h3>{gotCats}</h3>
        )}
      </div>
    </div>
  );
}

export default ShowReview;
