import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

function BookList({ data }) {
  return (
    <>
      <ul>
        {data.loading ? (
          <div>Loading books...</div>
        ) : (
          data.books.map((book) => <li key={book.id}>{book.name}</li>)
        )}
      </ul>
    </>
  );
}

export default graphql(getBookQuery)(BookList);
