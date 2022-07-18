import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppFunctionsNewModal, AppFunctionsEditor } from '../../components';

import { appFunctionsActions } from '../../store';

export { Functions };

function Functions() {
    const dispatch = useDispatch();
    const user = useSelector(x => x.auth.user);
    const { appFunctions: functions } = useSelector(x => x.appFunctions);

    useEffect(() => {
        console.log(functions);
        console.log(appFunctionsActions);
        dispatch(appFunctionsActions.getAll());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="appFunctions">
            <nav className="navbar navbar-expand">
                <div className="navbar-nav">
                    <h1>System Custom Functions:</h1>
                    <div className="btn-group" role="group">
                        <button className="btn-primary" onClick={() => dispatch(appFunctionsActions.toggleNewForm())}>Create New ➕</button>
                    </div>
                </div>
            </nav>
            <div className="row">
                {functions.length &&
                    <ul className="list-group col-sm-5">
                        {functions.map(func =>
                            <li className="list-group-item" key={func.id}>
                                <div className="card">
                                    <div className="card-body" title={func.name}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{func.name}</h5>
                                            <small>
                                                <button className="btn-secondary" onClick={() => dispatch(appFunctionsActions.editFunction(func.id))}>🎨 Edit</button>
                                                <button className="btn-danger" onClick={() => dispatch(appFunctionsActions.deleteFunction(func.id))}>❌ Delete</button>
                                            </small>
                                        </div>
                                        <p className="mb-0">📑 {func.description}</p>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                }
                {functions.loading && <div className="spinner-border spinner-border-sm"></div>}
                {functions.error && <div className="text-danger">Error loading users: {functions.error.message}</div>}
                <AppFunctionsNewModal />
                <AppFunctionsEditor />
            </div>
        </div >
    );
}