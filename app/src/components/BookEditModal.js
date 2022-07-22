import { useSelector, useDispatch } from 'react-redux';

import { myBooksActions } from '../store';

import { BookEditForm } from '.';

const { toggleNewModal } = myBooksActions;


export function BookEditModal() {

    const dispatch = useDispatch();
    const { editing } = useSelector(x => x.myBooks);

    if (editing == null) return '';

    return (
        <div id="exampleModalLive" className="modal fade show" role="dialog" aria-labelledby="exampleModalLiveLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <BookEditForm />
                </div>
            </div>
        </div>
    )
}