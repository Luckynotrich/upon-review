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

import { deleteCategory} from '../../../utils/future-self-api';
import { fontHeight, WinWidth, textHeight, rowCount } from './mui-styles/card-stack';
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
  let gridHeight, cardHeight, textH;

  textH = Text ? textHeight(Text.length, f, w) : 40;

  let calcW = w > 640 ? w / 2 : w;

  let g_prows = rowCount(category.pros, f, calcW);
  let g_crows = rowCount(category.cons, f, calcW);

  let prows = g_prows > category.pros.length ? g_prows : category.pros.length;
  let crows = g_crows > category.cons.length ? g_crows : category.cons.length;

  let pcrows;
  let pad = 68;
  let f_Plus_Pad = parseInt(f) + pad;

  if (w > 640) {
    pcrows = prows > crows ? prows : crows;
    gridHeight =  f_Plus_Pad * pcrows + 62;
    cardHeight = 90 + gridHeight + textH + 240;
  } else if (w > 512) {
    pcrows = prows + crows;
    gridHeight =  f_Plus_Pad * pcrows + 154 ;
    cardHeight = 100 + gridHeight + textH;
  } else if (w > 400) {
    pcrows = prows + crows;
    gridHeight =  Math.ceil(f_Plus_Pad * pcrows * .9) + 124;
    cardHeight = 90 + gridHeight + textH;
  } else {
    pcrows = prows + crows;
    gridHeight =  Math.ceil(f_Plus_Pad * pcrows * .8)+ 124;
    cardHeight = 90 + gridHeight + textH ;
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
        minWidth: 320, 
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
            left: { micro: "50%", mobile: "60%", tablet: "50%" },
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
          <CreateMuiTable cats={category.pros} name={'Likes'} rows={1}/>
          <CreateMuiTable cats={category.cons} name={'Disikes'} rows={1}/>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'wrap-line', paddingTop: '1rem' }}
          >
            {Text}
          </Typography>
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

        <Box
          sx={{
            height: `${gridHeight}px`,
            display: { micro: 'none', mobile: 'none', tablet: 'block' },
          }}
        >
          <Create2ColumnTable cats={category} gridHeight={gridHeight} rows={1}/>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingTop: '1rem', whiteSpace: 'wrap-line' }}
          >
            {Text}
          </Typography>
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
