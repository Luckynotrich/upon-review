//src/components/show-review.jsx
import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import { Box, Button, Typography } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CategoryContext from "../contexts/category-context";
import UserContext from "../contexts/user-context";
import { useCatsQuery } from "../contexts/current-cats-context";
import { getRevs, logout } from "../../utils/future-self-api";
import { helpText } from "../help.js";

import Header from "../header";
import RevRating from "./rev-rating";

// src/components/show/card/rev-notable-img-media-card.jsx
import RevNoTableCard from "./card/rev-notable-img-media-card.jsx";
import RevImgMediaCard from "./card/rev-img-media-card.jsx";
import HelpNoTableCard from "./card/help-notable-img-media-card.jsx";
import CatImgMediaCard from "./card/cat-img-media-card.jsx";

import { getDesignTokens } from "./card/mui-styles/cardTheme.js";
const darkModeTheme = createTheme(getDesignTokens("dark"));
const lightModeTheme = createTheme(getDesignTokens("light"));

import HelpIcon from "@mui/icons-material/Help";

function ShowReview() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [selected, setSelected] = useState([0]);

  const toggleItem = (id) => {
    let newArray = [];
    if (selected.includes(id)) {
      newArray = selected.filter((itemId) => itemId !== id);
    } else {
      newArray.push(...selected, id);
    }
    setSelected(newArray);
  };

  const isItemSelected = (id) => selected.includes(id);

  const { userId } = useContext(UserContext);
  const { categories, setCategories } = useContext(CategoryContext);

  const { data: cats } = useCatsQuery(userId);
  useEffect(() => {
    setCategories(cats);
  }, [cats]);

  const logoutMutation = useMutation({
    mutationFn: (data) => {
      logout();
    },
    onError: (error) => {
      console.log("onError =", error);
    },
    
  });
  const {
    data: revs,
    isLoading,
    isError,
    error,
    onSucess,
  } = useQuery({
    queryKey: ["revs", userId],
    queryFn: () => getRevs(userId),
    staleTime: 1000 * 60 * 5, // 5 minute
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;
  else if (!cats)
    return (
      <div className="noCategories">
        <h4>No categories yet. Please add a category</h4>
      </div>
    );
  else {
    return (
      <ThemeProvider theme={prefersDarkMode ? darkModeTheme : lightModeTheme}>
        <div className="show-view">
          {/*  <header style={{display: 'flex',flexFlow:'row'}}> */}
          <Header ID={"show-view-title"} title={"View"} />
          {/* </header> */}
          <div style={{ display: "flex", flex: "row" }}>
            <h2 key={"title"}>Categories</h2>
            <h2 style={{ color: "#2c9905", paddingLeft: "1rem" }}>Reviews </h2>
            
            
              <Button
                onClick={() => {
                   toggleItem(helpText.review.id);
                }}
              >
                <span
                  id="helpButton"
                  className="material-symbols-outlined"
                  style={{
                    color: "white",
                    marginLeft: "0%",
                    marginTop: ".5rem",
                  }}
                >
                  help
                </span>
              </Button>
            
            {isItemSelected(helpText.review.id) && (
              <Box
                sx={{
                  marginTop: {
                    tablet: "1.8rem",
                    Ltablet: "2.6rem",
                    laptop: "3rem",
                  },
                  marginLeft: "-60%",
                  zIndex: "3",
                }}
              >
                <HelpNoTableCard
                  className="column"
                  category={helpText.category}
                  review={helpText.review}
                   toggleItem={toggleItem}
                  elem={"hidP"}
                />
              </Box>
            )} 
            <button
              className="exitIcon"
              style={{
                width: "120px",
                height: "40px",
                marginLeft: "10%",
                marginTop: "2%",
              }}
              onClick={() => {
                logoutMutation.mutate();
                setTimeout(window.location.reload(), 500);
                // history.go(-1);
                window.location.reload();
                // history.back(-1);
              }}
            />
            <p id="hidP" style={{ color: "transparent" }}></p>
          </div>

          <div className="columns">
            {cats &&
              cats.map((category, i) => {
                return (
                  <div className="categories" key={i + 1}>
                    <Box
                      sx={{
                        marginLeft: {
                          micro: "0",
                          mobile: "-1rem",
                          tablet: "1rem",
                          laptop: "5rem",
                          desktop: "7rem",
                        },
                      }}
                    >
                      {isItemSelected(category.id) && (
                        <CatImgMediaCard
                          category={category}
                          toggleItem={toggleItem}
                          elem={"hidP"}
                          reviewsExist={revs.some(
                            (rev) => rev.cat_id === category.id
                          )}
                        />
                      )}
                      {!isItemSelected(category.id) && (
                        <Button
                          onClick={() => {
                            toggleItem(category.id);
                          }}
                        >
                          <h4 className="categories" key={category.id}>
                            {category.name}
                          </h4>
                        </Button>
                      )}
                    </Box>
                    <div key={(i + 1) * 10}>
                      {revs.map((rev) => {
                        if (Number(rev.cat_id) === Number(category.id))
                          return (
                            <Box key={rev.id + 100}>
                              {rev.pros.length + rev.cons.length > 0 &&
                                isItemSelected(rev.id) && (
                                  <RevImgMediaCard
                                    className="column"
                                    category={category}
                                    review={rev}
                                    toggleItem={toggleItem}
                                    elem={"hidP"}
                                  />
                                )}
                              {rev.pros.length + rev.cons.length === 0 &&
                                isItemSelected(rev.id) && (
                                  <RevNoTableCard
                                    className="column"
                                    category={category}
                                    review={rev}
                                    toggleItem={toggleItem}
                                    elem={"hidP"}
                                  />
                                )}
                              {!isItemSelected(rev.id) && (
                                <Box
                                  width="30%"
                                  key={rev.id + 1000}
                                  sx={{
                                    marginLeft: {
                                      mobile: "-1rem",
                                      tablet: "5rem",
                                      laptop: "7rem",
                                      desktop: "7rem",
                                    },
                                    paddingBottom: "0%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "left",
                                  }}
                                >
                                  <Button
                                    className="rev-butt"
                                    id={rev.id}
                                    onClick={() => {
                                      toggleItem(rev.id);
                                    }}
                                    sx={{
                                      textDecoration: "underline",
                                      textAlign: "left",
                                      width: "fit-content",
                                    }}
                                  >
                                    <Typography
                                      color="primary"
                                      sx={{
                                        textWrap: {
                                          micro: "pretty",
                                          mobile: "pretty",
                                          tablet: "nowrap",
                                        },
                                      }}
                                    >
                                      {rev.name}
                                      <RevRating
                                        rating={rev.rating}
                                        className="show-rating"
                                      />
                                    </Typography>
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          );
                      })}
                    </div>
                  </div>
                );
              })}
            {/* </div> */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </ThemeProvider>
    );
  }
}
// }
export default ShowReview;
