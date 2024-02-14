import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box, CardHeader } from '@mui/material';
import  List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ImgMediaCard({ category, rev, toggleItem }) {
  let caption, Text, kategori;
  const [pros,setPros] = useState([])
   const [cons,setCons] = useState([]);
  useEffect(() => {
    console.log('card rev.name', rev.name, ' rev ', rev);
    console.log('card category.name', category.name, ' category ', category);
    if (rev.pros && rev.pros.length > 0) {
      rev.pros.map((pro) => {
        category.pros.find((catPro) => {
          catPro.id === pro.id &&
            setPros([...pros,{ value: catPro.value, id: catPro.id }]);
        });
      });
      console.log('pros =', pros);
    }
    if (rev.cons && rev.cons.length > 0) {
      rev.cons.map((con) => {
        category.cons.find((catCon) => {
          catCon.id === con.id &&
            setCons([...cons,{ value: catCon.value, id: catCon.id }]);
        });
      });
      console.log('cons', cons);
    }
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
        width: '70%',
        maxWidth: 1045,
        minWidth: 1045,//290,
        minHeight: 1000,
        backgroundColor: 'lightblue',
      }}
    >
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      {/* <CardActions>
        <Button size="medium">
          <span className="material-symbols-outlined">share</span>
        </Button>
        {rev.url &&
          (rev.url.includes('http') || rev.url.includes('www') ? (
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
      </CardActions> */}

      <CardContent>
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row nowrap',
            width: '100%',
          }}
        >
          <Typography gutterBottom variant="p" component="div">
            <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
              {kategori}
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
              size="large"
            />
          )}
        </Box> */}
      {/* </CardContent>
      <CardContent> */}
        <Box /* className="proConBox" */>
          <div>LIKES</div>
            <List>
          {pros.map((pro) => {
              <ListItem key={pro.id}>
                <ListItemText primary={pro.value} />
              </ListItem>
            })}
            </List>
        </Box>
        {/* <Box className="proConBox">
          <div>DISLIKES</div>
          <List>
          {cons &&
            cons.length > 0 &&
            cons.map((con) => {
              <ListItem key={con.id}>
                <ListItemText primary={con.value} />
              </ListItem>;
            })}
            </List>
        </Box> */}
      </CardContent>
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          {Text}
        </Typography>
      </CardContent> */}
    </Card>
  );
}
