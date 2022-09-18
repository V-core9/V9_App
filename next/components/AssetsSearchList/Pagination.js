import { useSelector, useDispatch } from 'react-redux';
import { goToNextPage, goToPrevPage, goToPage } from '../../store/nasaAssetsSlice';

function SearchListPagination() {
    const dispatch = useDispatch();
    const { collection, search } = useSelector(x => x.nasaAssets);

    let totalPages = Math.ceil((collection?.metadata?.total_hits || 0) / 100);

    if (totalPages > 100) totalPages = 100;

    let paginationOptions = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationOptions.push((search.page === i) ? <option value={i} selected>{i}</option> : <option value={i} >{i}</option>);
    }

    return (
        <pagination>
            <info>
                <p>Total Hits: {collection?.metadata?.total_hits}</p>
            </info>
            <options>
                <button type="button" onClick={(e) => dispatch(goToPrevPage())}>◀ Prev</button>
                <p>Page #{search.page} of {totalPages}</p>
                <select onChange={(e) => dispatch(goToPage(e.target.value))}>
                    {paginationOptions}
                </select>
                <button type="button" onClick={(e) => dispatch(goToNextPage())}>Next ▶</button>
            </options>
        </pagination>
    )
}

export default SearchListPagination;