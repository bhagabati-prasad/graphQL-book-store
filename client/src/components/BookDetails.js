import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

function BookDetails({ data }) {
  return (
    <div id='book_details'>
      {data?.loading ? (
        <div>Loading book details...</div>
      ) : (
        data.book && (
          <>
            <hr />
            <div className='book_details'>
              <h2>{data?.book?.name}</h2>
              <p>Genre: {data?.book?.genre}</p>
              <p>
                Author: {data?.book?.author.name}({data?.book?.author.age})
              </p>
              <h4>Other books by this author</h4>
              <ul>
                {data?.book?.author?.books.map((book) => (
                  <li key={book.id}>{book.name}</li>
                ))}
              </ul>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default graphql(getBookQuery, {
  options: (props) => ({ variables: { id: props.bookId } }),
})(BookDetails);
