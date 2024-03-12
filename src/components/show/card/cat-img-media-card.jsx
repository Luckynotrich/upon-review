import React, { useState, useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box /* , CardHeader */ } from '@mui/material';

import CreateMuiTable from './create-mui-table';
// import CreateGrid from './create-grid';
import Create2ColumnTable from './create-2-column-table';

import { deleteReview } from '../../../utils/future-self-api';
import { Reviews } from '@mui/icons-material';

export default function CatImgMediaCard({ category, toggleItem, elem, reviewsExist }) {
  let Text = '';
  if (category.text) Text = category.text;

  const [w, setW] = useState(dubya); // get window width
  const [f, setf] = useState(eff(elem)); //measure font size

  useEffect(() => {
    const handleResize = () => {
      setW(dubya);
      setf(eff(elem));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: (data) => {
      deleteReview(data);
    },
    onError: (error) => {
      console.log('onError = ', error);
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries('cats');
    },
    onSettled: (data) => {
      queryClient.invalidateQueries('cats');
      // runDontWalk(`reviewMutation.onSettled`);
    },
  });
  let gridHeight = // height of dataGrid based on number of rows
    40 *
    (category.pros.length > category.cons.length
      ? category.pros.length
      : category.cons.length);

  let textHeight = Text ? txthite(Text.length, f, w) : 80;
  let cardHeight = 154 + gridHeight + textHeight + 240;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 700,
        minWidth: 320, //290,
        minHeight: 100,
        height: cardHeight ? `${cardHeight}px` : '750px',
      }}
    >
      <CardActions>
        
        <Button size="medium" sx={{ left: '2%', paddingRight: '1rem' }}>
          <span className="material-symbols-outlined">share</span>
        </Button>
       
        <Button
          sx={{ left: '65%' }}
          size="medium"
          onClick={() => toggleItem(category.id)}
        >
          <span className="material-symbols-outlined">close</span>
        </Button>
        {!reviewsExist && <Button
          onClick={async (e) => {
            e.preventDefault();
            let id = review.id;
            deleteReviewMutation.mutateAsync(id);
            toggleItem(review.id);
          }}
          sx={{left: '70%'}}
        >
          <span className="material-symbols-outlined">delete</span>
        </Button>}
      </CardActions>

      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row nowrap',
            width: '100%',
          }}
        >
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ display: 'flex', flexFlow: 'row wrap' }}
          >
            <h3 style={{ marginLeft: '-0%', marginTop: '-2%' }}>{category.name}</h3>
           
          </Typography>
        </Box>
      </CardContent>

      <CardContent>
        <Box
          sx={{ display: { mobile: 'block', tablet: 'none', desktop: 'none' } }}
        >
          <CreateMuiTable
            cats={category.pros}
            name={'Likes'}
          />
          <CreateMuiTable
            cats={category.cons}
            name={'Disikes'}
          />
          <Typography variant="body2" color="text.secondary">
            {Text}
          </Typography>
        </Box>

        <Box
          sx={{
            height: `${gridHeight}px`,
            display: { mobile: 'none', tablet: 'block' },
          }}
        >
          <Create2ColumnTable cats={category} gridHeight={gridHeight} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: '1rem' }}
          >
            {Text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
//function to dirive aproximate font size
// based on an element id passed as elem
const eff = (elem) => {
  let arr = window
    .getComputedStyle(document.getElementById(elem))
    .fontSize.split('p');
  return arr[0];
};
//function to control width for
//card height calculation
const dubya = () => {
  if (window.innerWidth < 1280) return window.innerWidth;
  else return 1280;
};
//function to estimate the height of the
//text from the review
const txthite = (length, f, w) => {
  let text = Math.ceil((length * f) / w);
  if (text <= 2) text = text + 3;
  return Math.ceil(text * f * 1.5);
};
