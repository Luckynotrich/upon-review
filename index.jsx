import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SelectedDataContextProvider } from './src/components/contexts/selected-data-context.jsx';
import { ReviewContextProvider } from './src/components/contexts/review-context.jsx';
import { CategoryContextProvider } from './src/components/contexts/category-context.jsx';
import { UserContextProvider } from './src/components/contexts/user-context.jsx';
import App from './src/App.jsx';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <CategoryContextProvider>
        <SelectedDataContextProvider>
          <ReviewContextProvider>
            <Router basename="/"> 

              <App />
              
              <ReactQueryDevtools initialIsOpen={false} position='bottom-left'/>
            </Router>
          </ReviewContextProvider>
        </SelectedDataContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
    </QueryClientProvider> 
  </React.StrictMode>
);


