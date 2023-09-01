import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import CatForm from "./components/category/cat-form.js";
import ReviewCategory from "./components/review/review-category.jsx";
import ShowReview from "./components/show-review";

import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <div className="routes">
      <Link to="/">
        <button className="large-center">Future</button>
      </Link>
      
      <Link to="/cat-form">
        <button className="large-left" value="Upon" type="button">
          Upon
        </button>
      </Link>

      <Link to="/review-form">
        <button className="large-right" value="Review" type="button">
          {" "}
          Review
        </button>
      </Link>
      </div>
      <Outlet />
      
      <Routes>
        <Route exact path="/" element={<ShowReview />}></Route>
        <Route path="/cat-form" element={<CatForm />}></Route>
        <Route path="/review-form" element={<ReviewCategory />}></Route>
        <Route path="*" element={<ShowReview />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
