import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box, CardHeader } from '@mui/material';
export default function ImgMediaCard({ category, rev, toggleItem }) {
  let caption, Text, kategori;
  React.useEffect(() => {
    console.log('card rev.name',rev.name,' rev ',rev);
    console.log('card category.name',category.name,' category ',category);
    if(rev.pros && rev.pros.length > 0) {rev.pros.map((pro) => {
      category.pros.find((catPro) => {catPro.id === pro.id && 
      console.log('catPro.value =',catPro.value ,catPro.id,' === ', pro.id)})})}
      if(rev.cons && rev.cons.length > 0) {rev.cons.map((con) => {
        category.cons.find((catCon) => {catCon.id === con.id && 
        console.log('catCon.value =',catCon.value ,catCon.id,' === ', con.id)})})}
}, [rev]);
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
        width: '70%',
        maxWidth: 1045,
        minWidth: 290,
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
        {rev.url &&( rev.url.includes('http') || rev.url.includes('www')?
         (
          <Button
            href={rev.url}
            target="_blank"
            size="medium"
            variant="outlined"
          >
            <span className="material-symbols-outlined">Forward</span>
          </Button>
        ) : (
          <Button
            href={`https:\\www.${rev.url}`}
            target="_blank"
            size="medium"
            variant="outlined"
          >
            <span className="material-symbols-outlined">Forward</span>
          </Button>
        ))}
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
            <div style={{ display: 'flex', 'flexFlow': 'row nowrap' }}>
              {kategori}:-:
              {caption}
            </div>
          </Typography>
          {rev.rating && rev.rating > 0 ? (
            <Rating
              className="show-rating"
              name="read-only"
              value={rev.rating}
              size="large"
              readOnly
            />
          ) : (
            <Rating
              className="show-rating"
              name="no-value"
              value={null}
              readOnly
              fontSize="inherit"
            />
          )}
        </Box>
       
      </CardContent>
      <CardContent>
      <Box className="proConBox">
          <div>LIKES</div>
          {rev.pros && rev.pros.length > 0 && (rev.pros.map((pro) => {
            category.pros.find((catPro) => {catPro.id === pro.id && 
            <div key={pro.id}>{catPro.value}</div>})}))}
            </Box>
            <Box className='proConBox'>
        <div>DISLIKES</div>
          {rev.cons && rev.cons.length > 0 && (rev.cons.map((con) => {
            category.cons.find((catCon) => {catCon.id === con.id && 
            <div key={con.id}>{catCon.value}</div>})}))}
     
      </Box>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent>
    </Card>
  );
}
