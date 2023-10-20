import React from 'react';
import ReactDOM from 'react-dom';
// import { ReactDOM } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import { ReactQueryDevtools } from 'react-query/devtools';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SelectedDataContextProvider } from './components/contexts/selected-data-context';
import { ReviewContextProvider } from './components/contexts/review-context';
import { CategoryContextProvider } from './components/contexts/category-context';
import { UserContextProvider } from './components/contexts/user-context';
import UseRefreshDetection from './utils/use-refresh-detection';
import App from './App.jsx';
//import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <CategoryContextProvider>
        <SelectedDataContextProvider>
          <ReviewContextProvider>
            <Router basename="/">
              {/* <QueryClientProvider client={QueryClient}> */}

              <App />
              <UseRefreshDetection />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}

              {/* </QueryClientProvider> */}
            </Router>
          </ReviewContextProvider>
        </SelectedDataContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
