import { NavLink } from 'react-router-dom';

export { NavItem };

function NavItem({ className, to, icon, text }) {
  return (
    <NavLink to={to} className={className}>
      <icon>{icon || '📦'}</icon>
      <span>{text || 'Missing NavItem Text'}</span>
    </NavLink>
  )
}
