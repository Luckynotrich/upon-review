import axios from './future-self-api.js'

export default ( async function getReviews(userId,_reviews) {
 
  axios.get('/api/review-api/' + userId,{
  headers:{accept: 'application/json'} })
  .then(res => {res.data})
    .then(data => {_reviews.current = data})
  .catch((e) => {console.log('ERROR ERROR', e, 'ERROR ERROR')})
  
  // return res.data;
  })

// eslint-disable-next-line no-unused-vars
export function postReview (catId, revName, revURL, revDate, revRating, reviewTxt,propArray) {
  
  axios.post('/api/review-api/addNew/?', {
    catId, revName, revURL, revDate, revRating, reviewTxt, propArray
  })
    .then(res => {
      if (!res.ok) {
        return res.data;
      }
    })
    .catch((e) => {
      console.log('ERROR ERROR', e, 'ERROR ERROR')
    })
}
// module.exports = postReview
