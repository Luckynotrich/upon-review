import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
export default function ImgMediaCard({ category, rev, toggleItem }) {
  let caption, Text,kategori;
  {
    if (rev) {
      (caption = rev.name), (Text = rev.text),(kategori=category.name)
    } else {
      (caption = 'See a Review (or 3)'),
        (Text =
          'Click on a name to see a review. Names appear below and to the right of their category');
    }
  }

  return (
    <Card sx={{ maxWidth: 645, minWidth: 290 }}>
           {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
      <Typography gutterBottom variant="p" component="div">
          Category: {kategori}
        </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {rev.rating && rev.rating > 0 ? (
          <Rating sx={{left:'-50%'}} name="read-only" value={rev.rating} size="large" readOnly />
        ) : (
          <Rating sx={{left:'-50%'}}name="no-value" value={null} readOnly fontSize="inherit" />
        )}
        <Typography gutterBottom variant="h6" component="div">
          {caption}
        </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>(toggleItem(rev.id))}>Dismiss</Button>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
