//src/components/show-review.jsx

import React,{ useContext } from 'react';
import { useQuery } from '@tanstack/react-query';


import CategoryContext from './contexts/category-context';
import ReviewContext from './contexts/review-context';
import UserContext from './contexts/user-context';
                      //src/utils/future-self-api.js
import { getRevs } from '../utils/future-self-api';
import Header from './header';
import { useCategoriesQuery} from './contexts/current-categories-context';

function ShowReview() {
  //                                        
  const { userId } = useContext(UserContext);
  const {data: cats} = useCategoriesQuery(userId);
  const { setReviews } = useContext(CategoryContext);

const {
  data: revs,
     isLoading,
   isError,
   error,
   onSucess,
} = useQuery({
  queryKey: ['revs', userId],
  queryFn: () => getRevs(userId),
  staleTime: 1000 * 60 * 5, // 5 minute
  onSucess: (revs) => {
    console.log('show-review::revs ', revs);
    setReviews(revs);    
  }
});
if (isLoading) return <div>Loading...</div>;
else if (isError) return <div>Error: {error.message}</div>;
else if(!cats) return <div className="noCategories"><h4>No categories yet. Please add a category</h4></div>;
else {
  return (
    <div>
      <Header ID={'show-view-title'} title={'View'}/>
      <div className='categorTree'>
        {cats&& (
          cats.map((category,i) => {
            return (<div key={i+1}>
            <h4 key={category.id}>{category.name}</h4>
                      <ul key={(i+1)*10}>{revs.map((rev)=>{if(Number(rev.cat_id) === Number(category.id)) return (<li key={rev.id}>{rev.name}</li>)})}</ul>
                      </div>
            )
          })
        ) 
        }
      </div>
    </div>
  );}
} 
// }
export default ShowReview;
  