import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCardTop({category, rev }) {
  let caption, Text;
  {
    if (rev) {
      (caption = rev.name), (Text = rev.text);
    } else {
      (caption = 'See a Review (or 3)'), (Text = 'Click on a review to display. ');
    }
  }

  return (
    <Card sx={{ maxWidth: '66%',minWidth: 200 }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        {/* <Typography gutterBottom variant="h6" component="div">
          {caption}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small">dismiss</Button>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
