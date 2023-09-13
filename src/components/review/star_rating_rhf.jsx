import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { useController } from 'react-hook-form';

function StarRating({ size, setRevRating, rating, control, name }) {
  const { field } = useController({ name, control });
  const [value, setValue] = useState(field.value);
  const [hover, setHover] = useState(null);
 
  React.useEffect(() => {
    setValue(0);
    setRevRating(0);
  },[])

  return (
    <div className="starEnvelope">
      {rating > 0 ? (
        <label className="star-lable">
          {rating} Stars<span>&nbsp;&nbsp;</span>
        </label>
      ) : (
        <label className="star-lable">
          Un-rated<span>&nbsp;&nbsp;</span>
        </label>
      )}
      <div style={{ display: 'flex' }} className="starEnvelope">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <FaStar
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              className="star"
              size={size}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              key={'star' + ratingValue}
              onClick={() => {
                setRevRating(ratingValue);
                field.onChange(ratingValue);
              }}
            >
              <input
                name="starRating"
                type="button"
                value={ratingValue}
                onChange={(e) => {
                  field.onChange();
                  setValue(e.target.value);
                  console.log('field.value: ', field.value);
                }}
              ></input>
            </FaStar>
          );
        })}
      </div>
    </div>
  );
}
export default StarRating;
// /home/lucky/webdev/playground-react-vite/src/star_rating_rhf.jsx
