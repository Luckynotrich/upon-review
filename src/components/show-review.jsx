import React, { createContext, useState, useEffect, useContext } from 'react';
import CategoryContext from './contexts/category-context';
import axios from '../_axios-programming-interface.js';
// import {useAxios} from './hooks/use-axios'


const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';

function ShowReview() {
    const { categories, setCategories} = useContext(CategoryContext);
     let _categories = React.useRef()
  let isSubscribed = React.useRef(true);
  useEffect(async () => {
    async function GetCats() {

        try{
        let response = await axios.get("/api/category-api/" + userId);
           _categories.current = await response.data
           setCategories(_categories.current);
          }
          catch(error){
            console.log(error)
          }
      return () => (isSubscribed.currentValue = false)
    }
      GetCats();
  }, []);

    return ( 
        <div>
        <h1 className='show-title'>Views</h1>
        <ul>
        {categories.map((category) => {
            return (<li key={category.id}>{category.name}</li>
            )
        })}
        </ul>
    
    </div> 
    );
}

export default ShowReview;