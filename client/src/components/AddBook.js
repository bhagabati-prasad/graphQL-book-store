import { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  getAuthorQuery,
  addBookMutation,
  getBookQuery,
} from '../queries/queries';

function AddBook(props) {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    author: '',
  });

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addBookMutation({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.author,
      },
      refetchQueries: [{ query: getBookQuery }],
    });
  };

  return (
    <form method='POST' onSubmit={handleSubmit}>
      <fieldset>
        <legend>
          <h3>Add Book</h3>
        </legend>
        <div className='field'>
          <label>Book name:</label>
          <input
            type='text'
            name='name'
            value={book.name}
            onChange={handleChange}
          />
        </div>
        <div className='field'>
          <label>Genre:</label>
          <input
            type='text'
            name='genre'
            value={book.genre}
            onChange={handleChange}
          />
        </div>
        <div className='field'>
          <label>Author:</label>
          <select name='author' onChange={handleChange}>
            <option value=''>Select author</option>
            {props.authorsQuery.loading ? (
              <option disabled>Loading authors...</option>
            ) : (
              props.authorsQuery.authors.map((author) => (
                <option value={author.id} key={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button type='submit'>Add Book</button>
      </fieldset>
    </form>
  );
}

export default compose(
  graphql(getAuthorQuery, { name: 'authorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
