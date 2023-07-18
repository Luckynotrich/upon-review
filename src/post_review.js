import axios from './_axios-programming-interface.js'

export default function getReviews(req, res) {
 
  axios.get('/api/review-api/?')
  .then(res => {res.data})
  .catch((e) => {console.log('ERROR ERROR', e, 'ERROR ERROR')})
  
  return res.data;
  }

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
