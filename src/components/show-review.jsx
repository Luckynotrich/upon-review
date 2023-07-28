import React, { useContext, useRef, useEffect } from 'react';
import CategoryContext from './contexts/category-context';
import ReviewContext from './contexts/review-context';
import UserContext from './contexts/user-context';
import axios from '../utils/_axios-programming-interface.js';


function ShowReview() {
  const { categories, setCategories } = useContext(CategoryContext);
  const { reviews, setReviews } = useContext(ReviewContext);
  const { userId } = useContext(UserContext);
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
              response = await axios.get('/api/review-api/' + userId);
              _reviews.current = await response.data;
              if (_reviews.current.length > 0) setReviews(_reviews.current);
          }else{
              console.log("no categories");
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
      <h1 className="show-title">Views</h1>
      <ul>
        {categories.map((category) => {
          return <li key={category.id}>{category.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default ShowReview;
