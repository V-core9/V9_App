import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { NavItem } from './NavItem';

import './nav.scss';

import { authActions, applicationActions } from '../../store';


export { Nav };

function Nav() {
  const { nav } = useSelector(x => x.application);
  const authUser = useSelector(x => x.auth.user);
  const dispatch = useDispatch();

  const [isPC, setIsPC] = useState(window.innerWidth >= 768);

  const isAdmin = (!authUser) ? false : (authUser.isAdmin) ? authUser.isAdmin : false;

  window.addEventListener("resize", event => {
    setIsPC(window.innerWidth >= 768);
  });

  return (
    <nav className={[`${(nav.isOpen) ? 'shown' : ''} ${(isPC) ? 'isPC' : ''}`]}>
      {!isPC && <div className="overlay" onClick={() => dispatch(applicationActions.setIsOpen(!nav.isOpen))}></div>}
      {!isPC && <header>
        <h5>Navigation</h5>
        <button onClick={() => dispatch(applicationActions.setIsOpen(!nav.isOpen))}>{nav.isOpen === true ? '❌' : '🔽'}</button>
      </header>}
      <section>
        <h2><icon>🅿</icon><span>Public</span></h2>
        <NavItem to="/" text="Home" icon="🏠" />
        <NavItem to="/redux-counter" text="Redux Counter" icon="🔄" />
        <NavItem to="/nasa-search" text="NASA Assets" icon="🔎" />
      </section>
      {(!!authUser) && <section>
        <h2><icon>🚀</icon><span>Application</span></h2>
        <NavItem to="/books" text="Books" />
        <NavItem to="/my-books" text="My Books" icon="📑" />
      </section>}
      {(isAdmin) && <section>
        <h2><icon>👨‍💻</icon><span>Administration</span></h2>
        <NavItem to="/dashboard" text="Dashboard" />
        <NavItem to="/users" text="Users" />
      </section>}
      {(isAdmin) && <section>
        <h2><icon>👨‍💻</icon><span>Experimental</span></h2>
        <NavItem to="/functions" text="Functions" />
      </section>}
      <section>
        <h2><icon>👥</icon><span>Account</span></h2>
        {(!authUser) && <NavItem to="/login" text="Login" icon="🚏" />}
        {(!authUser) && <NavItem to="/register" text="Register" icon="🚀" />}
        {(!!authUser) && <NavItem to="/my-profile" text="My Profile" icon="👥" />}
        {(!!authUser) && <button onClick={() => dispatch(authActions.logout())}>🔻 Logout</button>}
      </section>
    </nav>
  );
}
