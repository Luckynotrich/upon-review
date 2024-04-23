import React, { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box /* , CardHeader */ } from "@mui/material";

import UrlButton from "./url_button_mui";
import RevRating from "../rev-rating";

import { deleteReview } from "../../../utils/future-self-api";
import {
  fontHeight,
  WinWidth,
  textHeight,
  noBackSlash_r,
} from "./mui-styles/card-stack";
import { meld } from "./meld";

export default function HelpNoTableCard({
  category,
  review,
  toggleItem,
  elem,
}) {
  let Text = "";
  if (review.text) {
    Text = noBackSlash_r(review.text);
  }

  const [w, setW] = useState(WinWidth(window)); // get window width in px
  const [f, setf] = useState(fontHeight(elem, window)); //measure font size in px
  

  let gridHeight, cardHeight, textH;
  let calcW, mult = 1;

  textH = Text ? textHeight(Text, mult, f, w) : 40;
  
  if (parseInt(w) > 640) calcW = Math.ceil(parseInt(w) / 3);
  else calcW = w;

  if (w > 1168) {
    gridHeight =  40; // height of on number of rows
    cardHeight = 190 + gridHeight + textH + 60;
  } else if (w > 940) {
    gridHeight =  40; // height of on number of rows
    cardHeight = 190 + gridHeight + Math.ceil(textH * 1.8);
   } else if (w > 640) {
      gridHeight =  40; // height of on number of rows
      cardHeight = 190 + gridHeight + Math.ceil(textH * 1.3);
     } else if (w > 512) {
    gridHeight =  40;
    cardHeight = 190 + gridHeight + textH;
  } else if (w > 400) {
    gridHeight = 40;
    cardHeight = 190 + gridHeight + Math.ceil(textH * 1.3);
  } else {
    gridHeight = 40;
    cardHeight = 190 + gridHeight + Math.ceil(textH * 1.45);
  }
 
  useEffect(() => {
    const handleResize = () => {
      setW(WinWidth(window));
      setf(fontHeight(elem, window));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const queryClient = useQueryClient();
  const deleteReviewMutation = useMutation({
    mutationFn: (data) => {
      deleteReview(data);
    },
    onError: (error) => {
      console.log("onError = ", error);
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("revs");
    },
    onSettled: (data) => {
      queryClient.invalidateQueries("revs");
      // runDontWalk(`reviewMutation.onSettled`);
    },
  });

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 700,
        minWidth: { micro: 325, mobile: 340,tablet: 400,Ltablet: 480,laptop: 520 },
        minHeight: 100,
        height: cardHeight ? `${cardHeight}px` : "750px",
        marginLeft: {
          micro: ".7rem",
          mobile: ".9rem",
          tablet: "1.2rem",
          laptop: "3rem",
          desktop: "5rem",
        },
      }}
    >
      <CardActions>
        <Button size="medium" sx={{ left: "2%", paddingRight: "1rem" }}>
          <span className="material-symbols-outlined">share</span>
        </Button>
        {review.url && (
          //See './url_button_mui'
          <UrlButton url={review.url} sx={{ left: "15%", border: "none" }} />
        )}
        <Button
          sx={{
            left: {
              micro: "40%",
              mobile: "45%",
              Mmobile: "50%",
              MaxMoble: "55%",
              tablet: "63%",
              Ltablet: "65%",
              laptop: "70%",
            },
            desktop: "90%",
          }}
          size="medium"
          onClick={() => toggleItem(review.id)}
        >
          <span className="material-symbols-outlined">close</span>
        </Button>
      </CardActions>

      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexFlow: "row nowrap",
            width: "100%",
          }}
        >
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ display: "flex", flexFlow: "row wrap" }}
          >
            <div>{category.name}:</div>
            <h3 style={{ marginLeft: "-0%", marginTop: "-2%" }}>
              {review.name}
              <RevRating rating={review.rating} />
            </h3>
          </Typography>
        </Box>
      </CardContent>
     
      <CardContent>
        <Box
          sx={{
            height: `${gridHeight}px`,
            display: {
              micro: "block",
              mobile: "block",
              tablet: "none",
              desktop: "none",
            },
          }}
        >
       
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", paddingTop: "1rem" }}
          >
            {Text}
          </Typography>
        
        </Box>

        <Box
          sx={{
            height: `${gridHeight}px`,
            display: { micro: "none", mobile: "none", tablet: "block" },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", paddingTop: "1rem" }}
          >
            {Text}
          </Typography>
          
        </Box>
      </CardContent>
    </Card>
  );
}
