import {useContext, useRef} from 'react';
import CategoryContext from './contexts/category-context';
import axios from '../utils/_axios-programming-interface.js';

 export default async function getData(userId) {
    const { setCategories } = useContext(CategoryContext);
  
  
  let _categories = useRef();
//   let _reviews = useRef();
  let isSubscribed = useRef(true);
    try {
        let response = await axios.get('/api/category-api/' + userId);
        _categories.current = await response.data;
        if (_categories.current.length > 0) {
            console.log("get-categories categories", _categories.current);
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
