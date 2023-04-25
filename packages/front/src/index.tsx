import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './theme/ThemeProvider';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthProvider from './auth0/AuthProvider';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_URL || '',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </Provider>
        </ApolloProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
