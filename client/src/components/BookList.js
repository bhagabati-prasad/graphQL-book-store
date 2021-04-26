import { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList({ data }) {
  const [bookId, setBookId] = useState(null);
  return (
    <>
      <div className='book_list'>
        <ul>
          {data.loading ? (
            <div>Loading books...</div>
          ) : (
            data.books.map((book) => (
              <li key={book.id} onClick={() => setBookId(book.id)}>
                {book.name}
              </li>
            ))
          )}
        </ul>
      </div>
      <BookDetails bookId={bookId} />
    </>
  );
}

export default graphql(getBooksQuery)(BookList);
