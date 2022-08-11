import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavItem } from '../../components';
import { userActions } from '../../store';

export { Users };

function Users() {
  const dispatch = useDispatch();
  const user = useSelector(x => x.auth.user);
  const { users } = useSelector(x => x.users);

  useEffect(() => {
    dispatch(userActions.getAll());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="adminUsers">
      <header>
        <h2>Users Management</h2>
        <NavItem className="button success" icon="➕" text="Create" to='/users/new' />
      </header>
      {users.length &&
        <section>
          {users.map(user =>
            <div title={user.username} key={user.id}>
              <header>
                <div>
                  <h5>{user.isAdmin ? '👨‍💻 Admin' : '👤 User'} : {user.username}</h5>
                  <p>📧 {user.email}</p>
                </div>
                <small>
                  <NavItem className="button info" icon="🎨" text="Edit" to={'/users/edit/' + user.id} />
                </small>
              </header>
            </div>
          )}
        </section>
      }
      {users.loading && <div >LOADING...</div>}
      {users.error && <div className="error">Error loading users: {users.error.message}</div>}
      <footer>
        <h5>Pagination Space</h5>
      </footer>
    </section >
  );
}
