import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQ, setYearEnd, setYearStart, startNewSearch, resetYearStart, resetYearEnd, toggleImageMediaType, toggleVideoMediaType, toggleAudioMediaType, setTitle, setDescription, setLocation } from '../../store/nasaAssetsSlice';


function SearchListFiler() {
    const dispatch = useDispatch();
    const { collection, search } = useSelector(x => x.nasaAssets);

    const [advancedFiltersStatus, setAdvancedFiltersStatus] = useState(false);

    let totalPages = Math.ceil((collection?.metadata?.total_hits || 0) / 100);

    if (totalPages > 100) totalPages = 100;

    const submittinForm = (e) => {
        e.preventDefault();
        dispatch(startNewSearch());
    };


    return (
        <filter>
            <form onSubmit={submittinForm}>
                <heading>
                    <form_group>
                        <label for="search_q">Search Query</label>
                        <input type="text" id="search_query_string" name='search_q' value={search.q} onChange={(e) => dispatch(setSearchQ(e.target.value))} />
                        <action className={`${(search.q !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setSearchQ(''))} title="Reset Input Field.">🔄</action>
                    </form_group>
                    <form_group>
                        <button type="submit">Search</button>
                        <action onClick={(e) => setAdvancedFiltersStatus(!advancedFiltersStatus)}>{(advancedFiltersStatus ? 'Hide Filters' : 'Open Filters')}</action>
                    </form_group>
                </heading>
                {
                    advancedFiltersStatus && <content >

                        <form_group>
                            <label for="media_type">Media Type</label>
                            <action onClick={(e) => dispatch(toggleAudioMediaType())} className={(search.media_type.indexOf('audio') !== -1) ? 'greenAction' : ''}>Audio</action>
                            <action onClick={(e) => dispatch(toggleVideoMediaType())} className={(search.media_type.indexOf('video') !== -1) ? 'greenAction' : ''}>Video</action>
                            <action onClick={(e) => dispatch(toggleImageMediaType())} className={(search.media_type.indexOf('image') !== -1) ? 'greenAction' : ''}>Image</action>
                        </form_group>

                        <form_group>
                            <label >Title</label>
                            <input type="text" value={search.title} onChange={(e) => dispatch(setTitle(e.target.value))} />
                            <action className={`${(search.title !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setTitle(''))} title="Reset Input Field.">🔄</action>
                        </form_group>

                        <form_group>
                            <label >Description</label>
                            <input type="text" value={search.description} onChange={(e) => dispatch(setDescription(e.target.value))} />
                            <action className={`${(search.description !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setDescription(''))} title="Reset Input Field.">🔄</action>
                        </form_group>

                        <form_group>
                            <label >Location</label>
                            <input type="text" value={search.location} onChange={(e) => dispatch(setLocation(e.target.value))} />
                            <action className={`${(search.location !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setLocation(''))} title="Reset Input Field.">🔄</action>
                        </form_group>

                        <form_group>
                            <label >Start Year</label>
                            <input type="number" value={search.yearStart} onChange={(e) => dispatch(setYearStart(e.target.value))} />
                            <action className={`${(search.yearStart !== 1) ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(resetYearStart())} title="Reset Input Field.">🔄</action>
                        </form_group>

                        <form_group>
                            <label >End Year</label>
                            <input type="number" value={search.yearEnd} onChange={(e) => dispatch(setYearEnd(e.target.value))} />
                            <action className={`${(search.yearEnd !== (new Date()).getFullYear()) ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(resetYearEnd())} title="Reset Input Field.">🔄</action>
                        </form_group>
                    </content>
                }
            </form>
        </filter>
    )
}

export default SearchListFiler;