import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import CatForm from "./components/cat-form.js";
import ReviewForm from "./components/review/review-form";
import ShowReview from "./components/show-review";
import { SelectedDataContextProvider } from "./components/contexts/selected-data-context";
import { ReviewContextProvider } from "./components/contexts/review-context";
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button className="large-center">Future</button>
      </Link>
      
      <Link to="/cat-form">
        <button className="large-left" value="Upon" type="button">
          Upon
        </button>
      </Link>

      <Link to="/review-creator">
        <button className="large-right" value="Review" type="button">
          {" "}
          Review
        </button>
      </Link>
      <Outlet />
      <Routes>
      <SelectedDataContextProvider>
        <Route exact path="/" element={<ShowReview />}></Route>
        <Route path="/cat-form" element={<CatForm />}></Route>
        <ReviewContextProvider>
        <Route path="/review-creator" element={<ReviewForm />}></Route>
        </ReviewContextProvider>
        </SelectedDataContextProvider>
      </Routes>
    </div>
  );
}

export default App;
