import React, { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box /* , CardHeader */ } from "@mui/material";
import { getDesignTokens } from "./mui-styles/cardTheme.js";

import UrlButton from "./url_button_mui";
import RevRating from "../rev-rating";
import CreateMuiTable from "./create-mui-table";
import Create2ColumnTable from "./create-2-column-table";

import { deleteReview } from "../../../utils/future-self-api";
import {
  fontHeight,
  WinWidth,
  textHeight,
  rowCount,
  noBackSlash_r,
  getMult
} from "./mui-styles/card-stack";
import { meld } from "./meld";

export default function RevImgMediaCard({
  category,
  review,
  toggleItem,
  elem,
}) {
  let Text = "";
  let txtlen;
  if (review.text) {
    Text = noBackSlash_r(review.text);
    txtlen = review.text.length;
  }

  const [w, setW] = useState(WinWidth(window)); // get window width in px
  const [f, setf] = useState(fontHeight(elem, window)); //measure font size in px
  let rows = 1;

  let gridHeight, cardHeight, textH;
  let calcW,
    g_crows,
    g_prows,
    prows,
    crows,
    mult = 1;

if(txtlen){
console.log('txtlen =',txtlen);
mult = getMult(txtlen, w)
}
  textH = Text ? textHeight(Text, mult, f, w) : 40;
 
  if (parseInt(w) > 640) calcW = Math.ceil(parseInt(w) / 3);
  else calcW = w;

  //meld generates an array of diplayed text for the table
  let pros = meld(category.pros, review.pros);
  let cons = meld(category.cons, review.cons);

  g_prows = rowCount(pros, f, calcW);
  g_crows = rowCount(cons, f, calcW);
  if (g_prows === 0 && g_crows === 0) g_prows = 0;

  prows = g_prows > review.pros.length ? g_prows : review.pros.length;
  crows = g_crows > review.cons.length ? g_crows : review.cons.length;

 

  let pcrows;
  let pad = 68;
  let f_Plus_Pad = parseInt(f) + pad;
  if (w > 1168) {
    pcrows = prows > crows ? prows : crows;
    gridHeight =  f_Plus_Pad * pcrows + 62; // height of on number of rows
    cardHeight = 190 + gridHeight + textH + 60;
   } else if (w > 768) {
      pcrows = prows > crows ? prows : crows;
      gridHeight =  f_Plus_Pad * pcrows + 124; // height of on number of rows
      cardHeight = 190 + gridHeight + textH;
  } else if (w > 640) {
    pcrows = prows > crows ? prows : crows;
    gridHeight =  f_Plus_Pad * pcrows + 62 ; // height of on number of rows
    cardHeight = 190 + gridHeight + textH;
  } else if (w > 512) {
    pcrows = prows + crows;
    gridHeight =  f_Plus_Pad * pcrows + 124 ;
    cardHeight = 190 + gridHeight + textH;
  } else if (w > 400) {
    pcrows = prows + crows;
    gridHeight =  Math.ceil(f_Plus_Pad * pcrows * .8) + 124;
    // textH = Math.ceil(textH * 1.5)
    cardHeight = 190 + gridHeight + textH;
  } else {
    pcrows = prows + crows;
    gridHeight = f_Plus_Pad * pcrows + 124 ;
    // textH = Math.ceil(textH * 1.45);
    cardHeight = 190 + gridHeight + textH;
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
      minWidth: { micro: 325, mobile: 340 },
      minHeight: 100,
      height: cardHeight ? `${cardHeight}px` : "750px",
      marginLeft: {
        micro: ".7rem",
        mobile: ".9rem",
        tablet: "1.2rem",
        laptop: "5rem",
        desktop: "10rem",
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
              mobile: "43%",
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

      <CardContent /* sx={{marginLeft:{
                mobile: '-20px'
      }}} */
      >
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
      {/* {review.pros.length > 0 ||
        review.cons.length > 0 && ( */}
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
          <CreateMuiTable
            cats={category.pros}
            revs={review.pros}
            name={"Likes"}
            rows={rows}
          />

          <CreateMuiTable
            cats={category.cons}
            revs={review.cons}
            name={"Disikes"}
            rows={rows}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", paddingTop: "1rem" }}
          >
            {Text}
          </Typography>
          <CardActions>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                let id = review.id;
                deleteReviewMutation.mutateAsync(id);
                toggleItem(review.id);
              }}
              sx={{ marginLeft: {micro: "80%",mobile:"90%"} }}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button>
          </CardActions>
        </Box>

        <Box
          sx={{
            height: `${gridHeight}px`,
            display: { micro: "none", mobile: "none", tablet: "block" },
          }}
        >
          <Create2ColumnTable cats={category} revs={review} rows={rows} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", paddingTop: "1rem" }}
          >
            {Text}
          </Typography>
          <CardActions>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                let id = review.id;
                deleteReviewMutation.mutateAsync(id);
                toggleItem(review.id);
              }}
              sx={{ marginLeft: {micro: "80%",mobile:"90%"} }}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button>
          </CardActions>
        </Box>
      </CardContent>
      <br /><br /><br /><br /><br /><br /><br />
    </Card>
  );
}
