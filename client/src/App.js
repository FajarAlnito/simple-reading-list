import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

//Apollo client setup
const client = new ApolloClient({
  uri: '/api',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
        <AddAuthor />
        <AddBook />
      </div>
    </ApolloProvider>
  
  );
}

export default App;

