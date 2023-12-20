//src/components/show-review.jsx
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';
//src/utils/future-self-api.js
import { getRevs } from '../../utils/future-self-api';
import Header from '../header';
import { useCatsQuery } from '../contexts/current-cats-context';
import { Rating, Box, Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImgMediaCard from './img-media-card';

function ShowReview() {
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(143,212,0)',
      },
      typography: {
        fontFamily: 'Poppins',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
      },
    },
  });

  const [selected, setSelected] = useState([]);
  const toggleProp = (id) => {
    let newArray = [];
    if (selected.includes(id)) {
      newArray = selected.filter((itemId) => itemId !== id);
    } else {
      newArray.push(...selected, id);
    }
    setSelected(newArray);
  };
  const isItemSelected = (id) => selected.includes(id);
  const clearSelected = () => setSelected([]);

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
      <ThemeProvider theme={theme}>
        <div>
          <Header ID={'show-view-title'} title={'View'} />
          <div className="columns">
          <ImgMediaCard className="column" />
          <div className="categorTree">
            {cats &&
              cats.map((category, i) => {
                return (
                  <div className="categories" key={i + 1}>
                    <h4 className="categories" key={category.id}>
                      {category.name}
                    </h4>
                    <ul key={(i + 1) * 10}>
                      {revs.map((rev) => {
                        if (Number(rev.cat_id) === Number(category.id))
                          return (
                            <div key={rev.id}>
                              {isItemSelected(rev.id) && (
                                <ImgMediaCard className="column right" category={category} rev={rev} />
                              )}
                              <Box
                                  width="30%"
                                  key={rev.id + 1000}
                                  sx={{
                                    marginLeft: '25%',
                                    paddingTop: '5%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'left',
                                  }}
                                >
                                  <Button
                                    className="rev-butt"
                                    id={rev.id}
                                    sx={{
                                      marginLeft: '25%',
                                      paddingTop: '5%',
                                      fontSize: '1.2rem',
                                    }}
                                    onClick={() => {
                                      toggleProp(rev.id);
                                    }}
                                  >
                                    {rev.name}
                                  </Button>
                                </Box>
                              <li key={rev.id}>
                                <Box
                                  width="30%"
                                  key={rev.id + 500}
                                  sx={{
                                    marginLeft: '20%',
                                    paddingBottom: '3%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'left',
                                  }}
                                >
                                  {rev.rating && rev.rating > 0 ? (
                                    <Rating
                                      name="read-only"
                                      value={rev.rating}
                                      size="large"
                                      readOnly
                                      sx={{ paddingBottom: '5%' }}
                                    />
                                  ) : (
                                    <Rating
                                      name="no-value"
                                      value={null}
                                      readOnly
                                      fontSize="inherit"
                                    />
                                  )}
                                </Box>
                                
                              </li>
                              
                            </div>
                          );
                      })}
                    </ul>
                  </div>
                );
              })}
          </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
// }
export default ShowReview;
