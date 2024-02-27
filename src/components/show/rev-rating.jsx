import React from 'react';
import Rating from '@mui/material/Rating';

export default function RevRating({ rating}) {
 {if(rating && rating > 0)  {
return (
    <Rating
      // className="show-rating"
      name="read-only"
      value={rating}
      size="large"
      readOnly
    />
 )}
 return(
    <Rating
    //  className="show-rating"
      name="no-value"
      value={null}
      readOnly
      fontSize="inherit"
      size="large"
    />
  )
}
}