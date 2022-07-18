import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PublicBooksListItem } from '../../components';

import { bookActions } from '../../store';

export { Books };

function Books() {
    const dispatch = useDispatch();
    const { books } = useSelector(x => x.books);

    useEffect(() => {
        dispatch(bookActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="books">
            <h3>Public Books Listing:</h3>
            {books.length &&
                <ul className="list-group">
                    {books.map(book =>
                        <PublicBooksListItem book={book} />
                    )}
                </ul>
            }
            {books.loading && <div className="spinner-border spinner-border-sm"></div>}
            {books.error && <div className="text-danger">Error loading books: {books.error.message}</div>}
        </div>
    );
}