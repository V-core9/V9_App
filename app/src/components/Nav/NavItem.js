import { NavLink } from 'react-router-dom';

export { NavItem };

function NavItem(props) {
  return (
    <NavLink to={props.to}>
      {props.icon && <icon>{props.icon}</icon>}
      {props.text && <span>{props.text}</span>}
    </NavLink>
  )
}
