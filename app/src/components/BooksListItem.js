import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavItem } from './index';
import { myBooksActions } from '../store';

export function BooksListItem(props) {
  const { book } = props;
  const dispatch = useDispatch();

  return (
    <div className="books-list-item">
      <div className="details">
        <h4>Title: <strong>{book.title}</strong></h4>
        <p>Description: {book.description}</p>
        <small>ID: {book.id}</small>
      </div>
      <div className="options">
        <NavItem to={`/my-books/edit/${book.id}`} icon="🎨" text='Edit' className="button" />
        <button className="btn-danger" onClick={() => dispatch(myBooksActions.deleteBook(book.id))} title="Delete Book">❌ Delete</button>
      </div>
    </div>
  )
}
