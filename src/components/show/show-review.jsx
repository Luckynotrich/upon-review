//src/components/show-review.jsx
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';
//src/utils/future-self-api.js
import { getRevs } from '../../utils/future-self-api';
import Header from '../header';
import { useCatsQuery } from '../contexts/current-cats-context';
import { Rating, Box, Button } from '@mui/material/';
import ImgMediaCard from './img-media-card';

function ShowReview() {
  //
  const { userId } = useContext(UserContext);
  const { categories, setCategories } = useContext(CategoryContext);

  const { data: cats } = useCatsQuery(userId);
  useEffect(() => {
    setCategories(cats);
  }, [cats]);

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
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;
  else if (!cats)
    return (
      <div className="noCategories">
        <h4>No categories yet. Please add a category</h4>
      </div>
    );
  else {
    return (
      <div>
        <Header ID={'show-view-title'} title={'View'} />
      
        <div className="categorTree column">
          {cats &&
            cats.map((category, i) => {
              return (
                <div key={i + 1}>
                  <h4 key={category.id}>{category.name}</h4>
                  <ul key={(i + 1) * 10}>
                    {revs.map((rev) => {
                      if (Number(rev.cat_id) === Number(category.id))
                        return (
                          <li key={rev.id}>
                            <Box
                              width="30%"
                              key={rev.id + 500}
                              sx={{
                                marginLeft: '0%',
                                paddingTop: '1%',
                                display: 'flex',
                                flexFlow: 'row',
                              }}
                            >
                              {rev.rating && rev.rating > 0 ? (
                                <Rating
                                  // width="1px"
                                  name="read-only"
                                  value={rev.rating}
                                  fontSize="inherit"
                                  readOnly
                                />
                              ) : (
                                <Rating
                                  name="no-value"
                                  value={null}
                                  readOnly
                                  fontSize="inherit"
                                />
                              )}
                              <Button className="rev-butt" onClick={() => {}}>
                                {rev.name}
                              </Button>
                            </Box>
                          </li>
                        );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
        {/* <ImgMediaCard className="column right"/> */}
      </div>
    );
  }
}
// }
export default ShowReview;
