import React, { useEffect, useState, usefontHeightect } from 'react';

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

import { deleteCategory, deleteReview } from '../../../utils/future-self-api';
import { fontHeight, WinWidth, txthite, rowCount } from './mui-styles/card-stack';
// import { Reviews } from '@mui/icons-material';

export default function CatImgMediaCard({
  category,
  toggleItem,
  elem,
  reviewsExist,
}) {
  let Text = '';
  if (category.text) Text = category.text.replaceAll('\r\r', `\n`);

  const [w, setW] = useState(WinWidth(window)); // get window width
  const [f, setf] = useState(fontHeight(elem, window)); //measure font size
  let gridHeight, canHeight, cardHeight, textHeight;

  textHeight = Text ? txthite(Text.length, f, w) : 40;

  let calcW = w > 640 ? w / 2 : w;

  let g_prows = rowCount(category.pros, f, calcW);
  let g_crows = rowCount(category.cons, f, calcW);

  let prows = g_prows > category.pros.length ? g_prows : category.pros.length;
  let crows = g_crows > category.cons.length ? g_crows : category.cons.length;
  if (w > 640) {
    gridHeight = f * 2 * (prows > crows ? prows : crows); // height of on number of rows
    canHeight = gridHeight + 30;
    cardHeight = 154 + gridHeight + textHeight + 240;
  } else {
    gridHeight = 40 * (prows + crows);
    canHeight = -75;
    cardHeight = 154 + gridHeight + textHeight + 220;
  }

  
  useEffect(() => {
    const handleResize = () => {
      setW(WinWidth(window));
      setf(fontHeight(elem, window));
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: (data) => {
      deleteCategory(data);
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
          sx={{
            left: { micro: "50%", mobile: "28%", tablet: "50%" },
            desktop: "60%",
          }}
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
          sx={{
            display: {
              micro: 'block',
              mobile: 'block',
              tablet: 'none',
              desktop: 'none',
            },
          }}
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
            display: { micro: 'none', mobile: 'none', tablet: 'block' },
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
        <Box sx={{ position: 'relative', top: `${canHeight}px` }}>
          <CardActions>
            {!reviewsExist && (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  let id = category.id;
                  deleteCategoryMutation.mutateAsync(id);
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
