import { NavLink } from 'react-router-dom';

export { NavItem };

function NavItem(props) {
  return (
    <NavLink to={props.to} className={props.className}>
      <icon>{props.icon || '📦'}</icon>
      <span>{props.text}</span>
    </NavLink>
  )
}
