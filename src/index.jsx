import React from 'react';
import ReactDOM from 'react-dom';
// import { ReactDOM } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SelectedDataContextProvider } from './components/contexts/selected-data-context';
import { ReviewContextProvider } from './components/contexts/review-context';
import { CategoryContextProvider } from './components/contexts/category-context';
import { UserContextProvider } from './components/contexts/user-context';
import App from './App.jsx';
//import './index.css';
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <CategoryContextProvider>
        <SelectedDataContextProvider>
          <ReviewContextProvider>
            <Router basename="/">

              <App />
              
              <ReactQueryDevtools initialIsOpen={true} position='bottom-left'/>
            </Router>
          </ReviewContextProvider>
        </SelectedDataContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
