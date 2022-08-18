import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../helpers';

export { PrivateRoute };

function PrivateRoute({ children, adminRoute }) {
  const { user } = useSelector(x => x.auth);

  if (!user) return <Navigate to="/login" state={{ from: history.location }} />

  if ((!!adminRoute) && (!user.isAdmin)) return <Navigate to="/" state={{ from: history.location }} />

  // authorized so return child components
  return children;
}
