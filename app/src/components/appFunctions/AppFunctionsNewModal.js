import { useSelector } from 'react-redux';

import { AppFunctionsForm } from './AppFunctionsForm';

export function AppFunctionsNewModal() {

    const { newFormShow, editing } = useSelector(x => x.appFunctions);

    //if (!newFormShow && editing === null) return '';
    if (!newFormShow) return '';

    return (
        <div id="exampleModalLive" className="modal fade show" role="dialog" aria-labelledby="exampleModalLiveLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <AppFunctionsForm />
                </div>
            </div>
        </div>
    )
}