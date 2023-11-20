import React, {useEffect, useCallback} from 'react';
import { Routes, Route, Link, Outlet, } from 'react-router-dom';
import CreateCatForm from './components/category/create-cat-form.jsx';
import ReviewCategory from './components/review/review-category.jsx';
import ShowReview from './components/show-review.jsx';
import './scss/App.scss';

function App() {
  const [active, setActive] = React.useState([true, false, false]);
  console.log(`${import.meta.env.SNOWPACK_PUBLIC_TITLE}`+':',`${import.meta.env.SNOWPACK_PUBLIC_DESCRIPTION}`)
  const handleClick = (index) =>{
    return () => {
      const newActive = [false, false, false];
      newActive[index] = true;
      setActive(newActive);
    };
  };
  const handleKeyDown = useCallback((e) => {
    // F5
    if((e.which || e.keyCode) == 116) {
      e.preventDefault();
      location.reload();
      window.location.href = `${import.meta.env.SNOWPACK_PUBLIC_PROXY_URL}`///'http://localhost:8081';
      
  }
  // Ctrl+R
  if (e.ctrlKey && (e.which === 82) ) {
    e.preventDefault();
    //  const { href } = window.location;
    // console.log('href ', window.location);
    location.reload();
    window.location.href = `${import.meta.env.SNOWPACK_PUBLIC_PROXY_URL}`;//'http://localhost:8081';
  }
  },[])
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [handleKeyDown]);
  return (
    <div className="App">
      <div className="routes">
        <Link to="/">
          <button
          onClick={handleClick(0)}
            id={active[0] ? 'large-leftActive': 'large-left'}
            type="button"
          >
            Future
          </button>
        </Link>

        <Link to="/create-cat-form">
          <button
          onClick={handleClick(1)}
            id={active[1] ? 'large-centerActive' : 'large-center'}
            value="Upon"
            type="button"
          >
            Upon
          </button>
        </Link>

        <Link to="/review-form">
          <button
          onClick={handleClick(2)}
            id={active[2] ? 'large-rightActive' : 'large-right'}
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
        <Route path="/create-cat-form" element={<CreateCatForm />}></Route>
        <Route path="/review-form" element={<ReviewCategory />}></Route>
        <Route path="*" element={<ShowReview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
