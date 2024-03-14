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
  return Math.ceil(text * f - 1);
};

const rowCount = (procon, f, w) => {
  let count = 0;
  procon.forEach((pc) => {
    count += Math.ceil((pc.value.length * f) / w);
  });
  return count;
};

export default function CatImgMediaCard({
  category,
  toggleItem,
  elem,
  reviewsExist,
}) {
  let Text = '';
  if (category.text) Text = category.text.replaceAll('\r\r', `\n`);

  const [w, setW] = useState(dubya); // get window width
  const [f, setf] = useState(eff(elem)); //measure font size
  let gridHeight, canHeight, cardHeight, textHeight;

  textHeight = Text ? txthite(Text.length, f, w) : 40;
  let g_prows = rowCount(category.pros, f, w / 2);
  let g_crows = rowCount(category.cons, f, w / 2);

  let prows = g_prows > category.pros.length ? g_prows : category.pros.length;
  let crows = g_crows > category.cons.length ? g_crows : category.cons.length;
  if (w > 640) {
    gridHeight = f * 2 * (prows > crows ? prows : crows); // height of dataGrid based on number of rows
    canHeight = gridHeight + 30;
    cardHeight = 154 + gridHeight + textHeight + 240;
  } else {
    gridHeight = 40 * (prows + crows);
    canHeight = -80;
    cardHeight = 154 + gridHeight + textHeight + 160;
  }

  console.log('prows = ', prows);
  console.log('crows = ', crows);
  console.log(' f =', f);
  console.log(' w =', w);
  console.log('gridHeight =', gridHeight);
  console.log('canHeight =', canHeight);
  console.log('cardHeight =', cardHeight);
  console.log('category.pros.length ', category.pros.length);
  console.log('category.cons.length ', category.cons.length);

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
    },
  });

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
            <h3 style={{ marginLeft: '-0%', marginTop: '-2%' }}>
              {category.name}
            </h3>
          </Typography>
        </Box>
      </CardContent>

      <CardContent>
        <Box
          sx={{ display: { mobile: 'block', tablet: 'none', desktop: 'none' } }}
        >
          <CreateMuiTable cats={category.pros} name={'Likes'} />
          <CreateMuiTable cats={category.cons} name={'Disikes'} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'wrap-line', paddingTop: '1rem' }}
          >
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
            sx={{ paddingTop: '1rem', whiteSpace: 'wrap-line' }}
          >
            {Text}
          </Typography>
        </Box>
      </CardContent>
      <CardContent sx={{ flex: 'column' }}>
        {/* {`${canHeight}`} */}
        <Box sx={{ position: 'relative', top: `${canHeight}px` }}>
          <CardActions>
            {!reviewsExist && (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  let id = category.id;
                  deleteReviewMutation.mutateAsync(id);
                  toggleItem(category.id);
                }}
                sx={{ marginLeft: '80%' }}
              >
                <span className="material-symbols-outlined">delete</span>
              </Button>
            )}
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
}
