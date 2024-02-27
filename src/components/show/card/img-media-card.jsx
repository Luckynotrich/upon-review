import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box/* , CardHeader */ } from '@mui/material';
import UrlButton from '../url_button_mui';
import { theme } from "./styles/styles.js";
import RevRating from '../rev-rating';
import CreateMuiTable from './create-mui-table';
import CreateGrid from './create-grid';


export default function ImgMediaCard({ category, rev, toggleItem }) {
  let caption, Text, kategori;
  
    if (rev) {
      (caption = rev.name), (Text = rev.text), (kategori = category.name);
    } else {
      (caption = 'See a Review (or 3)'),
        (Text =
          'Click on a name to see a review. Names appear below and to the right of their category');
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
              <RevRating rating={rev.rating} />
            </div>
          </Typography>
        </Box>
      </CardContent>
      
        <CardContent>
           <ThemeProvider theme={theme}>
      <Box sx={{ display: { mobile: "block", tablet: "none", desktop: 'none' } }}>
        <CreateMuiTable values={category.pros} name={"Likes"} />
        <CreateMuiTable values={category.cons} name={"Disikes"} />
      </Box>
      
      <Box sx={{ height: 400, display: { mobile: "none", tablet: "block" } }}>
        <CreateGrid pros={category.pros} cons={category.cons}/>
        </Box>
        </ThemeProvider>
        </CardContent>
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent>
    </Card>
  );
}
