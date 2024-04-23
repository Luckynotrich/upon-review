import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import CreateCat from "./components/category/create-cat.jsx";
import ReviewCategory from "./components/review/review-category.jsx";
import ShowReview from "./components/show/show-review.jsx";
import "./scss/App.scss";

function App() {
  const [isDefault, setIsDefault] = useState(false);
  useEffect(() => {
    if (!isDefault) {
      setIsDefault(true);
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

export default App;
