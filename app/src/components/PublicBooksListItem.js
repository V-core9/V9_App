
export function PublicBooksListItem(props) {
    const { book } = props;

    return (
        <li className="list-group-item" key={book.id}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{book.title}</h5>
            </div>
            <p className="mb-1">{book.description}</p>
            <small>ID: {book.id}</small>
        </li>
    )
}