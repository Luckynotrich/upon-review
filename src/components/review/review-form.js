import React, { useState, useEffect, useRef, useContext } from "react";
import axios from 'axios';
import Header from "./header";
import Select from "./select.jsx";
import GetReview from "./get-review";
import SelectedDataContext from "../contexts/selected-data-context.js";
import ReviewContext from "../contexts/review-context";

const {userId} = require('./default_uuid')


const ReviewForm = () => {
  const { clearPropArray } = useContext(SelectedDataContext)
  const { setCatId} = useContext(ReviewContext)
  const [categories, setCategories] = useState([]);
  const [catState, setCatState] = useState("");
  
  let _categories = useRef()
  let isSubscribed = useRef(true);

  useEffect(() => {
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


const chooseCat = (e) => {
  const id = Number(e.target.value);

  const selectedCat = categories.filter((cat) => cat.id === id)[0];
  
  if (selectedCat) {
    clearPropArray();
    setCatId(id)
    setCatState(selectedCat);
  }
};


return (
  <div className="container">
    <Header />
    <form>
      {categories.length > 0 ? (
        <Select categories={categories} onSelect={chooseCat} key={categories.id} />
      ) : (
         " Categories currently unavailable. Please check the internet connection and refresh the browser"

      )}
    </form>

    {catState && <GetReview pros={catState.pros} cons={catState.cons} />
    }
  </div>
);
}

export default ReviewForm;
