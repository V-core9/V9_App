import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../store';

export { Footer };

function Footer() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    const isAdmin = (!authUser) ? false : (authUser.isAdmin) ? authUser.isAdmin : false;

    let adminMenu;
    if (isAdmin) adminMenu = <NavLink to="/users" className="nav-item nav-link">Users</NavLink>;


    // only show nav when logged in
    if (!authUser) return (
        <footer className="navbar navbar-expand">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
                <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
            </div>
        </footer>
    );

    return (
        <footer className="navbar navbar-expand">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/books" className="nav-item nav-link">Books</NavLink>
                <NavLink to="/myBooks" className="nav-item nav-link">MyBooks</NavLink>
                {adminMenu}
                <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </footer>
    );
}