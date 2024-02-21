import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import {createTheme} from '@mui/material/styles';
// import { ThemeProvider } from '@tanstack/react-query-devtools/build/lib/theme';}
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, CardHeader } from '@mui/material';
import UrlButton from './url_button_mui';
import Grid from './grid';
import RevRating from './rev-rating';


export default function ImgMediaCard({ category, rev, toggleItem }) {
  let caption, Text, kategori;
  const [rows, setRows] = useState([]);
  const theme = createTheme();
  theme.spacing(2);

  useEffect(() => {
    // console.log('category =', category);
    // console.log('rev =', rev);
    let phoRows = [];
    if (rev.pros && rev.pros.length > 0 && rev.pros[0].value !== null) {
      rev.pros.forEach((pro, index) => {
        category.pros.find((catPro) => {
          if (catPro.id === pro.id) {
            phoRows[index] = {
              id: index,
              col1: `${catPro.value}`,
              textCenter: true,
            };
          }
        });
      });
    }
    
      if (rev.cons && rev.cons.length > 0 && rev.cons[0].value !== null ) {
       
        rev.cons.forEach((con, index) => {
          category.cons.find((catCon) => {
            if (catCon.id === con.id)
              phoRows[index] = { ...phoRows[index], col2: `${catCon.value}` };
          });
        });
        if (rev.cons.length > rev.pros.length) {
          for (let i = rev.pros.length; i < rev.cons.length; i++) {
            category.cons.find((catCon) => {
              if (catCon.id === rev.con[i].id) {
                phoRows[i] = {
                  id: i,
                  col1: '',
                  col2: `${category.cons[i].value}`,
                };
              }
            });
          }
        }
      
    }else if(phoRows.length > 0) phoRows[0] = {
      id: 0,
      col2: 'none',
      textCenter: true,
    };
    setRows(phoRows);
  }, [rev, category]);
  {
    if (rev) {
      (caption = rev.name), (Text = rev.text), (kategori = category.name);
    } else {
      (caption = 'See a Review (or 3)'),
        (Text =
          'Click on a name to see a review. Names appear below and to the right of their category');
    }
  }

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 700,
        minWidth: 320, //290,
        minHeight: 100,
        backgroundColor: 'lightblue',
      }}
    >
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardActions>
        <Button size="medium">
          <span className="material-symbols-outlined">share</span>
        </Button>
        {rev.url && <UrlButton url={rev.url} />}
        <Button size="medium" onClick={() => toggleItem(rev.id)}>
          <span className="material-symbols-outlined">cancel</span>
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
          <Typography gutterBottom variant="p" component="div">
            <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              {kategori}:&nbsp;
              {caption}
            </div>
          </Typography>
          <RevRating rating={rev.rating} />
        </Box>
      </CardContent>
      { rows && rows.length > 0 && rows[0] !== Number(0) && (
        <CardContent>
          <Box className="proConBox">
            {/* <ThemeProvider theme={theme}> */}
            <Grid rows={rows} />
            {/* </ThemeProvider> */}
          </Box>
        </CardContent>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent>
    </Card>
  );
}
