//src/components/show-review.jsx
import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Box, Button, Typography } from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CategoryContext from "../contexts/category-context";
import UserContext from "../contexts/user-context";
import { useCatsQuery } from "../contexts/current-cats-context";
import { getRevs} from "../../utils/future-self-api";
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
import LogIn from "../login_react.jsx";



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
  const {  setCategories } = useContext(CategoryContext);

  const { data: cats } = useCatsQuery(userId);
  useEffect(() => {
    setCategories(cats);
  }, [cats]);

 
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
  else if (isError) return (<LogIn></LogIn>)//<div>Error: {error.message}</div>;
  else if (!cats)
    return (
      <div className="noCategories">
        <h4>No categories yet. Please add a category</h4>
      </div>
    );
  else {
    return (
      <ThemeProvider theme={prefersDarkMode ? darkModeTheme : lightModeTheme}>
        <div id="showView"className="show-view">
          <Header ID={"show-view-title"} title={"View"} />
          {/* </header> */}
          <div style={{ display: "flex", flex: "row" }}>
            <h2 key={"title"}>Categories</h2>
            <h2 style={{ color: "#2c9905", paddingLeft: "1rem" }}>Reviews </h2>
            <a href= "/"//{meta.env.VITE_PUBLIC_BASE_URL}
              target="_self"
              className="exitIcon"
              style={{
                minWidth:'120px',
                width: "120px",
                height: "40px",
                marginTop: "2%",
                borderStyle: 'hidden',
                border: 'hidden',
                backgroundColor: 'transparent',
              }}
             
            />
            </div>
            <div>
              <Button
                onClick={() => {
                   toggleItem(helpText.review.id);
                }}
                sx={{
                  color: "white",
                  marginLeft: {micro:"60%",},
                  marginTop: {micro:"-3rem",},
                }}
              >
                <span
                  id="helpButton"
                  className="material-symbols-outlined"
                  
                >
                  Help
                </span>
              </Button>
              </div>
              
            {isItemSelected(helpText.review.id) && (
              <Box
                sx={{
                  width: 'fitContent',
                  marginTop: {
                    tablet: "1.8rem",
                    Ltablet: "2.6rem",
                    laptop: "3rem",
                  },
                  marginLeft: {
                    micro: "0",
                    mobile: "-1rem",
                    tablet: "1rem",
                    laptop: "5rem",
                    desktop: "7rem",
                  },
                  zIndex: "3",
                }}
              >
                <HelpNoTableCard
                id='helpCard'
                  className="column"
                  category={helpText.category}
                  review={helpText.review}
                   toggleItem={toggleItem}
                  elem={"hidP"}
                />
              </Box>
            )} 
           
          
            <p id="hidP" style={{ color: "transparent" }}></p>
          

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
                                    inlineSize: "min-content",
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
                                        width: "fit-content"
                                    }}
                                  >
                                    <Typography
                                      color="primary"
                                      sx={{
                                        width: "fit-content",
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
