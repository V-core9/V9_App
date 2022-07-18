import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../store';
let adminNavShow = false;

export { Nav };

function Nav() {
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();

    const isAdmin = (!authUser) ? false : (authUser.isAdmin) ? authUser.isAdmin : false;


    return (
        <nav className="navbar navbar-expand">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Home</NavLink>
                {(!!authUser) && <NavLink to="/books" className="nav-item nav-link">Books</NavLink>}
                {(!!authUser) && <NavLink to="/myBooks" className="nav-item nav-link">MyBooks</NavLink>}
                {(isAdmin) && <NavLink to="/users" className="nav-item nav-link">Users</NavLink>}
                {(isAdmin) && <NavLink to="/functions" className="nav-item nav-link">Functions</NavLink>}
                {(!authUser) && <NavLink to="/login" className="nav-item nav-link">Login</NavLink>}
                {(!authUser) && <NavLink to="/register" className="nav-item nav-link">Register</NavLink>}
                {(!!authUser) && <button onClick={() => dispatch(authActions.logout())} className="btn btn-link nav-item nav-link">Logout</button>}
            </div>
        </nav>
    );
}