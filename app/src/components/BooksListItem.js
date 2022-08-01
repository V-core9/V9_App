import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavItem } from './index';
import { myBooksActions } from '../store';

export function BooksListItem(props) {
  const { book } = props;
  const dispatch = useDispatch();

  return (
    <li className="list-group-item" key={book.id}>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{book.title}</h5>
        <small>
          <NavItem to={`/my-books/edit/${book.id}`} icon="🎨" text='Edit' />
          <button className="btn-danger" onClick={() => dispatch(myBooksActions.deleteBook(book.id))} title="Delete Book">❌ Delete</button>
        </small>
      </div>
      <p className="mb-1">{book.description}</p>
      <small>ID: {book.id}</small>
    </li>
  )
}
