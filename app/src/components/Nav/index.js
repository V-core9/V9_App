import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { NavItem, Accordion } from '..';

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

      {!isPC && <header>
        <h5>Navigation</h5>
        <button onClick={() => dispatch(applicationActions.setIsOpen(!nav.isOpen))}>{nav.isOpen === true ? '❌' : '🔽'}</button>
      </header>}

      <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>🅿</icon><span>Public</span></h4>
          </>
        }
        disableToggleIcon={true}
        startOpen={false}
        content={
          <>
            <NavItem className="flex-inline" to="/" text="Home" icon="🏠" />
            <NavItem className="flex-inline" to="/redux-counter" text="Redux Counter" icon="🔄" />
            <NavItem className="flex-inline" to="/nasa-assets" text="NASA Assets" icon="🔎" />
          </>
        }
      />

      {!!authUser && <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>🚀</icon><span>Application</span></h4>
          </>
        }
        disableToggleIcon={true}
        startOpen={false}
        content={
          <>
            <NavItem to="/books" text="Books" icon="📚" />
            <NavItem to="/my-books" text="My Books" icon="📑" />
          </>
        }
      />}

      {isAdmin && <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>👷‍♂️</icon><span>Administration</span></h4>
          </>
        }
        disableToggleIcon={true}
        className="info"
        content={
          <>
            <NavItem to="/dashboard" text="Dashboard" icon="👨‍💻" />
            <NavItem to="/users" text="Users" icon="👥" />
          </>
        }
      />}

      {isAdmin && <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>🚩</icon><span>Experimental</span></h4>
          </>
        }
        startOpen={false}
        disableToggleIcon={true}
        className="warning"
        content={
          <>
            <NavItem to="/functions" text="Functions" icon="➰" />
            <NavItem to="/admin-app-info" text="Application Info" icon="📑" />
          </>
        }
      />}

      {isAdmin && <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>👷‍♂️</icon><span>Demos Pages</span></h4>
          </>
        }
        startOpen={false}
        disableToggleIcon={true}
        className="error"
        content={
          <>
            <NavItem to="/components-examples" text="Components" icon="🤦‍♂️" />
            <NavItem to="/error-404" text="404 Error" icon="🔻" />
          </>
        }
      />}

      <Accordion
        title={
          <>
            <h4 className="flex-inline"><icon>👥</icon><span>Account</span></h4>
          </>
        }
        startOpen={false}
        disableToggleIcon={true}
        content={
          <>
            {(!authUser) && <NavItem title="Login" to="/login" text="Login" icon="🚏" />}
            {(!authUser) && <NavItem title="Register" to="/register" text="Register" icon="🚀" />}
            {(!!authUser) && <NavItem title="My Profile" to="/my-profile" text="My Profile" icon="👥" />}
            {(!!authUser) && <button title="Logout" onClick={() => dispatch(authActions.logout())} className='warning'><icon>🔻</icon><span>Logout</span></button>}
          </>
        }
      />
    </nav>
  );
}
