import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../helpers';

export { AdminRoute };

function AdminRoute({ children }) {
  const { user: authUser } = useSelector(x => x.auth);

  if (!authUser.isAdmin) {
    return <Navigate to="/" state={{ from: history.location }} />
  }

  // authorized so return child components
  return children;
}
