import React from "react";
import { FaStar } from "react-icons/fa";
import { useController/* , useForm */ } from "react-hook-form";

import { useState } from "react";

 function StarRating({
  size,
  setReviewRating,
  rating,
  control,
  name,
}) {
  const { field } = useController({ name, control });
  const [value, setValue] = React.useState(field.value);
  const [hover, setHover] = useState(null);

  return (
    <div className="starEnvelope">
      {rating > 0 ? (
        <label className="star">
          {rating} Stars<span>&nbsp;&nbsp;</span>
        </label>
      ) : (
        <label className="star">
          un-Rated<span>&nbsp;&nbsp;</span>
        </label>
      )}
      <div style={{ display: "flex" }} className="starEnvelope">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            
               <FaStar
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  className="star"
                  size={size}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  key={"star" + ratingValue}
                  onClick={() =>{ 
                    setReviewRating(ratingValue)
                  // setValue(ratingValue);
                  field.onChange(ratingValue);
                }}
                  ><input
                  name="starRating"
                  type="radio"
                  value={ratingValue}
                  onChange={(e) => {
                    field.onChange(/* e.target.value */);
                    setValue(e.target.value);
                    console.log("field.value: ", field.value);
                  }}
                  
                >
                  </input></FaStar>
                
          );
          
        })}
        
        {/* <label
              htmlFor="starRating"
              id={`starLable` + ratingValue}
              key={"star" + ratingValue}
              style={{
                fontFamily: "react-icons/fa",
                content: "FaStar",
                color:ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" ,
              }}
            >
            
            </label> */}
      </div>
    </div>
  );
}
export default StarRating;
// /home/lucky/webdev/playground-react-vite/src/star_rating_rhf.jsx
