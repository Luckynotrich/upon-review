import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import CatForm from "./components/cat-form.js";
import ReviewForm from "./components/review/review-form";
import ShowReview from "./components/show-review";

import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button className="large-center">FutureSelf</button>
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
      <Outlet />
      
      <Routes>
        <Route exact path="/" element={<ShowReview />}></Route>
        <Route path="/cat-form" element={<CatForm />}></Route>
        <Route path="/review-form" element={<ReviewForm />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
