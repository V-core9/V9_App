import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux Slice
import { startSearch } from '../../store/nasaAssetsSlice';

// Component Import
import SearchListItem from './Item';
import SearchListFilter from './Filter';
import SearchListPagination from './Pagination';

function AssetsSearchListContainer() {
    const dispatch = useDispatch();
    const { collection, status, search } = useSelector(x => x.nasaAssets);

    let totalPages = Math.ceil((collection?.metadata?.total_hits || 0) / 100);

    if (totalPages > 100) totalPages = 100;

    let paginationOptions = [];

    useEffect(() => {
        // Prevent the page from loosing scroll position when you go back to it.
        if (collection.items === undefined) dispatch(startSearch(search));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    for (let i = 1; i <= totalPages; i++) {
        paginationOptions.push((search.page === i) ? <option value={i} selected>{i}</option> : <option value={i} >{i}</option>);
    }

    return (
        <searchlist>
            <SearchListFilter />
            <results>
                {status === 'loading' && <p>➰ Loading...</p>}
                {status === 'error' && <p>🔻 Error: Your IP might get banned for loading too much data in short period of time if you navigate many pages in short time.</p>}
                {collection.items?.map(item => <SearchListItem data={item} />)}
            </results>
            <SearchListPagination />
        </searchlist>
    );
};

export default AssetsSearchListContainer;