import axios from './_axios-programming-interface.js'

// eslint-disable-next-line no-unused-vars
export default function postReview (catId, revName, revURL, revDate, revRating, reviewTxt,propArray) {
  //console.log('reviewTxt ',reviewTxt)
  axios.post('http://localhost:8080/api/review-api/addNew/?', {
    catId, revName, revURL, revDate, revRating, reviewTxt, propArray
  })
    .then(res => {
      if (!res.ok) {
        return null
      }
    })
    .catch((e) => {
      console.log('ERROR ERROR', e, 'ERROR ERROR')
    })
}
// module.exports = postReview
