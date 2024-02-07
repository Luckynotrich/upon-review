//src/components/show-review.jsx
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CategoryContext from '../contexts/category-context';
import UserContext from '../contexts/user-context';

import { getRevs } from '../../utils/future-self-api';
import Header from '../header';
import { useCatsQuery } from '../contexts/current-cats-context';
import { Rating, Box, Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImgMediaCard from './img-media-card';
// import ImgMediaCardTop from './img-media-card-top';

function ShowReview() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2c9905',
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

  const [selected, setSelected] = useState([0]);
  const toggleItem = (id) => {
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
        <div className="show-view">
          <header>
          <Header ID={'show-view-title'} title={'View'} />
          {/* <ImgMediaCardTop className="topCard" /> */}
          </header>
          <h3 key={"title"}>
            
              Categories
            
            &nbsp; &nbsp; &nbsp; 
            <span style={{ color: '#2c9905', fontSize: '2.3rem' }}>Reviews</span> &nbsp; &nbsp; &nbsp; &nbsp; <span style={{ color: '#ff9933', fontSize: '2.3rem' }}>Rating</span>
          </h3>
          <div className="columns">
            {cats &&
              cats.map((category, i) => {
                return (
                  <div className="categories" key={i + 1}>
                    <h4 className="categories" key={category.id}>
                      {category.name}
                    </h4>
                    <div key={(i + 1) * 10}>
                      {revs.map((rev) => {
                        if (Number(rev.cat_id) === Number(category.id))
                          return (
                            <div key={rev.id} className='review'>
                              {isItemSelected(rev.id) && (
                                <ImgMediaCard className="column" category={category} rev={rev} toggleItem={toggleItem}/>
                              )}
                             {!isItemSelected(rev.id)&&( <Box 
                                  width="30%"
                                  key={rev.id + 1000}
                                  sx={{
                                    marginLeft: '10%',
                                    paddingBottom: '0%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'left',
                                  }}
                                >
                                  <Button
                                    className="rev-butt"
                                    id={rev.id}
                                    onClick={() => {
                                      toggleItem(rev.id);
                                    }}
                                  >
                                    {rev.name}
                                  </Button>
                                  {rev.rating && rev.rating > 0 ? (
                                    <Rating
                                      name="read-only"
                                      value={rev.rating}
                                      size="large"
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
                                </Box>)}
                                
                              {/* </li> */}
                              
                            </div>
                          );
                      })}
                    </div>
                  </div>
                );
              })}
          {/* </div> */}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
// }
export default ShowReview;
