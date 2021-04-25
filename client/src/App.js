import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import './App.css';
import AddBook from './components/AddBook';

// setup apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='main'>
        <h1>Book Store</h1>
        <hr />
        <BookList />
        <hr />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
