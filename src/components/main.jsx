import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import UserContext from "./contexts/user-context";

import CreateCat from "./category/create-cat.jsx";
import ReviewCategory from "./review/review-category.jsx";
import ShowReview from "./show/show-review.jsx";
// import LogIn from "./components/login.jsx"

export default function Main({UserId}) {
  const [isDefault, setIsDefault] = useState(false);
  const { setUserId } = useContext(UserContext);
  setUserId(UserId);
  
  useEffect(() => {
    if (!isDefault) {
      setIsDefault(true);
      const element = document.getElementById("large-left");
      element.classList.add("active");
    }
  }, []);
    return (
    <div className="App">
      <div className="routes">
        <NavLink
          to="/"
          id="large-left"
          className={({ isActive, isPending, isDefault }) =>
            isPending
              ? "pending"
              : isActive
                ? "active"
                : isDefault
                  ? "active"
                  : ""
          }
        >
          Future
        </NavLink>

        <NavLink to="/create-cat-form" id="large-center">
          Upon
        </NavLink>
        <NavLink to="/review-form" id="large-right" >
          Review
        </NavLink>
      </div>
      <Outlet />

      <Routes>
        <Route exact path="/" element={<ShowReview />}></Route>
        <Route path="/create-cat-form" element={<CreateCat />}></Route>
        <Route path="/review-form" element={<ReviewCategory />}></Route>
        <Route path="/*" element={<ShowReview />}></Route>
      </Routes>
    </div>
  );
}


// views/pages/fs_index.ejs
