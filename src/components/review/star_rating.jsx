import React from 'react';
import { FaStar } from 'react-icons/fa'


import { useState } from 'react';

const StarRating = ({ size, setReviewRating, rating }) => {

    const [hover, setHover] = useState(null);

    return (
        <div className='starEnvelope'>
            {rating > 0 ?
                <label className='star'>{rating} Stars<span>&nbsp;&nbsp;</span></label>
                : <label className='star'>Rate<span>&nbsp;&nbsp;</span></label>}
                <div style={{display: 'flex'}}className='starEnvelope'>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (<label htmlFor='star' key={'star' + ratingValue}>
                        <div onClick={() => setReviewRating(ratingValue)}>
                        <FaStar
                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                        className="star"
                        size={size}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        key={'star' + ratingValue}
                    />
                    </div>
                </label>
                )
            })}
            </div>
            
        </div>)
}
export default StarRating