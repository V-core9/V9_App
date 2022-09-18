import { useSelector } from 'react-redux';

import { BookEditForm } from '.';

export function BookEditModal() {
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
