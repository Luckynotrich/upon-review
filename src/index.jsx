import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SelectedDataContextProvider } from "./components/contexts/selected-data-context";
import { ReviewContextProvider } from "./components/contexts/review-context";
import { CategoryContextProvider } from "./components/contexts/category-context";
import App from './App.jsx';
//import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <CategoryContextProvider>
    <SelectedDataContextProvider>
    <ReviewContextProvider>
    <Router>
    <App />
    </Router>
    </ReviewContextProvider>
    </SelectedDataContextProvider>
    </CategoryContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
