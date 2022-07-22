import { useSelector, useDispatch } from 'react-redux';

import { BookNewForm } from '.';

export function BookNewModal() {

    const dispatch = useDispatch();
    const { newModalShow } = useSelector(x => x.myBooks);

    if (!newModalShow) return '';

    return (
        <div id="exampleModalLive" className="modal fade show" role="dialog" aria-labelledby="exampleModalLiveLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <BookNewForm />
                </div>
            </div>
        </div>
    )
}