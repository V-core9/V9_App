import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './header.module.scss';

import { applicationActions } from '../../store';


export { Header };

function Header() {
  const { nav } = useSelector(x => x.application);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <button onClick={() => dispatch(applicationActions.setIsOpen(!nav.isOpen))}>{nav.isOpen === true ? '❌' : '🔽'}</button>
      <NavLink to='/' >
        🏠 DemoLogo
      </NavLink>
    </header>
  );
}
