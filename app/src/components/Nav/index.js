import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './nav.scss';

import { authActions } from '../../store';


export { Nav };

function Nav() {
  const authUser = useSelector(x => x.auth.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isPC, setIsPC] = useState(window.innerWidth >= 768);

  const isAdmin = (!authUser) ? false : (authUser.isAdmin) ? authUser.isAdmin : false;

  window.addEventListener("resize", event => {
    setIsPC(window.innerWidth >= 768);
  });

  return (
    <nav>
      <header>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen === true ? '❌' : '🔽'}</button>
        <NavLink to='/' >
          🏠 DemoLogo
        </NavLink>
      </header>
      <section className={[`${(isOpen) ? 'shown' : ''} ${(isPC) ? 'isPC' : ''}`]}>
        {!isPC && <div className="overlay" onClick={() => setIsOpen(!isOpen)}></div>}
        <div>
          <header>
            <h5>Navigation</h5>
            <button onClick={() => setIsOpen(!isOpen)}>{isOpen === true ? '❌' : '🔽'}</button>
          </header>
          <div>
            <h2>Public</h2>
            <NavLink to='/'>🏠 Home</NavLink>
            <NavLink to='/redux-counter'>🔄 Redux Counter</NavLink>
            <NavLink to='/nasa-search'>🔎 NASA Assets</NavLink>
          </div>
          {(!!authUser) && <div>
            <h2>Application</h2>
            <NavLink to="/books">📚 Books</NavLink>
            <NavLink to="/my-books">📑 My Books</NavLink>
          </div>}
          {(isAdmin) && <div>
            <h2>Administration</h2>
            <NavLink to="/dashboard">👨‍💻 Dashboard</NavLink>
            <NavLink to="/users">👥 Users</NavLink>
            <NavLink to="/functions">➰ Functions</NavLink>
          </div>}
          <div>
            <h2>Account</h2>
            {(!authUser) && <NavLink to="/login">🚏 Login</NavLink>}
            {(!authUser) && <NavLink to="/register">🚀 Register</NavLink>}
            {(!!authUser) && <NavLink to="/my-profile">👥 My Profile</NavLink>}
            {(!!authUser) && <NavLink to="/my-profile">🔄 Settings</NavLink>}
            {(!!authUser) && <button onClick={() => dispatch(authActions.logout())}>🔻 Logout</button>}
          </div>
        </div>
      </section>
    </nav>
  );
}
