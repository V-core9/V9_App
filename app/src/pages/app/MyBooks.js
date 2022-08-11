import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BooksListItem, NavItem } from '../../components';

import { myBooksActions } from '../../store';

export { MyBooks };

function MyBooks() {
  const dispatch = useDispatch();
  const user = useSelector(x => x.auth.user);
  const myBooks = useSelector(x => x.myBooks);

  console.log(myBooks);

  useEffect(() => {
    dispatch(myBooksActions.getMyBooks());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="myBooks">
      <header>
        <h1>{user?.username} Books:</h1>
        <NavItem to="/my-books/new" text="Create New" icon="➕" className='button' />
      </header>
      <section>
        {myBooks.myBooks?.map(book =>
          <BooksListItem book={book} />
        )}
      </section>
      {myBooks.loading && <div className="spinner-border spinner-border-sm"></div>}
      {myBooks.error && <div className="text-danger">Error loading MyBooks: {myBooks.error.message}</div>}
    </section>
  );
}
