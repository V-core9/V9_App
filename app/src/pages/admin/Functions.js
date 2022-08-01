import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { appFunctionsActions } from '../../store';

export { Functions };

function Functions() {
  const dispatch = useDispatch();
  const { appFunctions: functions } = useSelector(x => x.appFunctions);

  useEffect(() => {
    dispatch(appFunctionsActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="appFunctions">
      <header>
        <h2>Better System Functions:</h2>
        <div>
          <button onClick={() => dispatch(appFunctionsActions.toggleNewForm())}>Create New ➕</button>
        </div>
      </header>
      <section>
        {functions.length && functions.map(func =>
          <div title={func.name}>
            <div className="itemInfo">
              <h5>{func.name}</h5>
              <p className="mb-0">📑 {func.description}</p>
            </div>
            <div className='actions'>
              <NavLink to={"/functions/" + func.id} >🎨 Edit</NavLink>
              <button onClick={() => dispatch(appFunctionsActions.deleteFunction(func.id))}>❌ Delete</button>
            </div>
          </div>
        )}
        {functions.loading && <div className="spinner-border spinner-border-sm"></div>}
        {functions.error && <div className="text-danger">Error loading users: {functions.error.message}</div>}
      </section>
      <footer>
        <p>PAGINATION SPACE</p>
      </footer>
    </div >
  );
}
