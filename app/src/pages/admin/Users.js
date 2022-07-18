import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../store';

export { Users };

function Users() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { users } = useSelector(x => x.users);

    useEffect(() => {
        dispatch(userActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="adminUsers">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Hi {user?.username}!</h5>
                <p>This is an example Admin Page</p>
                <small>
                    <select className="form-select">
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="20">20</option>
                    </select>
                </small>
            </div>
            {users.length &&
                <ul className="list-group">
                    {users.map(user =>
                        <li className="list-group-item" key={user.id}>
                            <div className="card">
                                <img className="card-img-top" src='/logo192.png' alt={user.username} />
                                <div className="card-body" title={user.username}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{user.username}</h5>
                                        <small>
                                            <button className="btn-secondary" onClick={() => console.log("I will EDIT User:", user.id)}>🎨 Edit</button>
                                            <button className="btn-danger" onClick={() => console.log("I will DELETE User:", user.id)} title="Delete Book">❌ Delete</button>
                                        </small>
                                    </div>
                                    <p className="mb-0">🆔 {user.id}</p>
                                    <p className="mb-1">📧 {user.email}</p>
                                    <small>Account Type: {user.isAdmin ? '👨‍💻 Admin' : '👤 User'}</small>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            }
            {users.loading && <div className="spinner-border spinner-border-sm"></div>}
            {users.error && <div className="text-danger">Error loading users: {users.error.message}</div>}
        </div >
    );
}