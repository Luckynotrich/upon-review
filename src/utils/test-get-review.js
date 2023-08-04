// testGetReviews.js
import getReviews from './get-reviews.js';

const testGetReviews = async () => {
    let reviews = [];
    await getReviews('11d6af03-20ac-4f04-a21c-28ec418a2c18', reviews);
    console.log('\n','testGetReviews = ', await reviews);
}
testGetReviews();