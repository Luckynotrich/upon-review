//src/components/show-review.jsx

import React,{ useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCats, getRevs } from '../utils/future-self-api';// src/utils/future-self-api.js
import CategoryContext from './contexts/category-context';
import ReviewContext from './contexts/review-context';
import Header from './header';
import UserContext from './contexts/user-context';

function ShowReview() {
  // const queryClient = useQueryClient();
  const {  setCategories } = useContext(CategoryContext);
  const {  setReviews } = useContext(ReviewContext);
  const { userId } = useContext(UserContext);
  const [gotCats, setGotCats] = useState('');

// 
const {
  data: cats,
  isLoading,
  isError,
  error,
  onSucess,
} = useQuery({
  queryKey: ['cats', userId],
  queryFn: () => getCats(userId),
  onSucess: (data) => {
    setCategories(data);    
  }
});
const {
  data: revs,
} = useQuery({
  queryKey: ['revs', userId],
  queryFn: () => getRevs(userId),
  onSucess: (revs) => {
    setReviews(revs);    
  }
});
if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {error.message}</div>;
if(cats && revs){
  return (
    <div>
      <Header ID={'show-view-title'} title={'View'}/>
      <div className='categorTree'>
        {cats.length > 0 ? (
          cats.map((category,i) => {
            return (<div key={i+1}>
            <h4 key={category.id}>{category.name}</h4>
                      <ul key={(i+1)*10}>{revs.map((rev)=>{if(Number(rev.cat_id) === Number(category.id)) return (<li key={rev.id}>{rev.name}</li>)})}</ul>
                      </div>
            )
          })
        ) : (
          <h3>No categories yet. Please add a category</h3>
        )}
      </div>
    </div>
  );
}

// if(reviewsQuery.fetchStatus==='idle') return <div>Loading...</div>
// if(reviewsQuery.fetchStatus==='loading') return <div>Loading...</div>
// if(reviewsQuery.fetchStatus==='error') return <div>Error: {reviewsQuery.error.message}</div>
// if(reviewsQuery.status==='success') setReviews(reviewsQuery); 


 
}

export default ShowReview;
  // useEffect(async () => {
  //   async function getData(userId) {
  //     try {
  //       let response = await axios.get('/api/category-api/' + userId);
  //       setGotCats('...loading');
  //       _categories.current = await response.data;
  //       if (_categories.current.length > 0) {
  //         console.log('show-review categories', _categories.current);
  //         await setCategories(_categories.current);
  //         response = await axios.get('/api/review-api/' + userId);
  //         _reviews.current = await response.data;
  //         if ( await _reviews.current.length > 0) {
  //           await setReviews(_reviews.current);
  //           await console.log('show-review reviews', _reviews.current);
  //         }
  //       } else {
  //         console.log('no categories');
  //         setGotCats('No categories yet. Please add a category');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     return () => (isSubscribed.currentValue = false);
  //   }
  //   getData(userId);
  // }, []);
