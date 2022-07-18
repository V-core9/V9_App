import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BookNewModal, BooksListItem, BookEditModal } from '../../components';

import { myBooksActions } from '../../store';

export { MyBooks };

function MyBooks() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { myBooks } = useSelector(x => x.myBooks);


    useEffect(() => {
        dispatch(myBooksActions.getMyBooks());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="myBooks">
            <nav className="navbar navbar-expand">
                <div className="navbar-nav">
                    <h1>{user?.username} Books:</h1>
                    <div className="btn-group" role="group">
                        <button className="btn-primary" onClick={() => dispatch(myBooksActions.toggleNewModal())}>Create New ➕</button>
                    </div>
                </div>
            </nav>
            {myBooks.length &&
                <ul className="list-group">
                    {myBooks.map(book =>
                        <BooksListItem book={book} />
                    )}
                </ul>
            }
            {myBooks.loading && <div className="spinner-border spinner-border-sm"></div>}
            {myBooks.error && <div className="text-danger">Error loading MyBooks: {myBooks.error.message}</div>}
            <BookNewModal />
            <BookEditModal />
        </div>
    );
}