import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import CatForm from './components/category/cat-form.js';
import ReviewCategory from './components/review/review-category.jsx';
import ShowReview from './components/show-review';

import './scss/App.scss';

function App() {
  const [active, setActive] = React.useState([true, false, false]);
  const handleClick = (index) =>{
    return () => {
      const newActive = [false, false, false];
      newActive[index] = true;
      setActive(newActive);
    };
  };
  return (
    <div className="App">
      <div className="routes">
        <Link to="/">
          <button
          onClick={handleClick(0)}
            className={active[0] ? 'large-leftClicked': 'large-left'}
            type="button"
          >
            Future
          </button>
        </Link>

        <Link to="/cat-form">
          <button
          onClick={handleClick(1)}
            className={active[1] ? 'large-centerClicked' : 'large-center'}
            value="Upon"
            type="button"
          >
            Upon
          </button>
        </Link>

        <Link to="/review-form">
          <button
          onClick={handleClick(2)}
            className={active[2] ? 'large-rightClicked' : 'large-right'}
            value="Review"
            type="button"
          >
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
