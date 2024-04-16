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
import CreateMuiTable from "./create-mui-table";
import Create2ColumnTable from "./create-2-column-table";

import { deleteReview } from "../../../utils/future-self-api";
import { fontHeight, WinWidth, txthite, rowCount, textNewLines } from "./mui-styles/card-stack";
import { meld } from "./meld";

export default function RevImgMediaCard({
  category,
  review,
  toggleItem,
  elem,
}) {
  let Text = "",
    textNL = 0;
  if (review.text) {
    Text = review.text.replaceAll("\r\r", `\n`);
    textNL = textNewLines(Text);
  }

  const [w, setW] = useState(WinWidth(window)); // get window width in px
  const [f, setf] = useState(fontHeight(elem, window)); //measure font size in px
  
  let gridHeight, canHeight, cardHeight, textHeight;
  let calcW, g_crows, g_prows, prows, crows;

  textHeight = Text ? txthite(Text.length, f, w) : 40;

    calcW = w > 640 ? Math.round(w / 3) : w;

  //meld generates an array of diplayed text for the table
  let pros = meld(category.pros, review.pros);
  let cons = meld(category.cons, review.cons);

  g_prows = rowCount(pros, f, calcW);
  g_crows = rowCount(cons, f, calcW);
  if (g_prows === 0 && g_crows === 0) g_prows = 2;

  prows = g_prows > review.pros.length ? g_prows : review.pros.length;
  crows = g_crows > review.cons.length ? g_crows : review.cons.length;

  let pcrows
  let pad = 68;
  let f_Plus_Pad = parseInt(f) + pad;
  if (w > 640) {
    pcrows = prows > crows ? prows : crows;
    gridHeight = f_Plus_Pad * pcrows + 62; // height of on number of rows
    canHeight = Math.ceil((textHeight + textNL * f) * (2 / 3)); 
    cardHeight = 190 + gridHeight + textHeight + 110;
  } else {
    pcrows = (prows + crows);
    gridHeight = f_Plus_Pad * pcrows + 124;
    canHeight = Math.ceil((textHeight + textNL * f) * (1.2));
    cardHeight = 190 + gridHeight + (textHeight * 1.2) + (textNL * f * 1.2) + 110;
  }
  // console.log("pros =", pros);
  // console.log("cons =", cons);
  // console.log(" w =", w);
  // console.log(" f =", f);
  // console.log("textNL =", textNL);
  // console.log("gridHeight =", gridHeight);
  // console.log("textHeight =", textHeight);
  // console.log("canHeight =", canHeight);
  // console.log("cardHeight =", cardHeight);
  // console.log("g_prows = ", g_prows);
  // console.log("g_crows = ", g_crows);
  // console.log("pcrows = ", pcrows);
  // console.log("f_Plus_Pad = ", f_Plus_Pad);
  // console.log('calcW =',calcW)
  // console.log("prows = ", prows);
  // console.log("crows = ", crows);
  // console.log('review.pros.length ', review.pros.length);
  // console.log('review.cons.length ', review.cons.length);
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
        minWidth: { micro: 340, mobile: 345 },
        minHeight: 100,
        height: cardHeight ? `${cardHeight}px` : "750px",
        marginLeft: {
          micro: "-5px",
          mobile: "-40px",
          tablet: "1rem",
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
            left: { micro: "40%", mobile: "28%", tablet: "50%" },
            desktop: "60%",
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
          />

          <CreateMuiTable
            cats={category.cons}
            revs={review.cons}
            name={"Disikes"}
          />
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
          <Create2ColumnTable cats={category} revs={review} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line", paddingTop: "1rem" }}
          >
            {Text}
          </Typography>
        </Box>
      </CardContent>
      {/* )} */}

      <CardContent sx={{ flex: "column" }}>
        <Box sx={{ position: "relative", top: `${canHeight}px` }}>
          <CardActions>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                let id = category.id;
                deleteReviewMutation.mutateAsync(id);
                toggleItem(category.id);
              }}
              sx={{ marginLeft: "37.5%" }}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
}

