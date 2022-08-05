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

  const isMediaAudio = (search.media_type.indexOf('audio') !== -1);
  const isMediaVideo = (search.media_type.indexOf('video') !== -1);
  const isMediaImage = (search.media_type.indexOf('image') !== -1);


  return (
    <filter>
      <form onSubmit={submittinForm}>
        <header>
          <h2>NASA Assets</h2>
          <div className='flex-inline'>
            <form_group className='header-search'>
              <form_group>
                <input type="text" id="search_query_string" name='search_q' value={search.q} onChange={(e) => dispatch(setSearchQ(e.target.value))} placeholder="Random Search Term" />
                <action className={`${(search.q !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setSearchQ(''))} title="Reset Input Field.">X</action>
              </form_group>
              <button type="submit">🔍 Search</button>
            </form_group>
            <action className="button" onClick={(e) => setAdvancedFiltersStatus(!advancedFiltersStatus)}>{(advancedFiltersStatus ? 'Hide Filters' : 'Show Filters')}</action>
          </div>
        </header>
        {
          advancedFiltersStatus && <section className="advanced-filters" >

            <form_group>
              <label for="media_type">Media Type</label>
              <div>
                <action onClick={() => dispatch(toggleAudioMediaType())} className={(isMediaAudio ? 'success' : 'error') + ' button'}>{isMediaAudio ? '✔' : '✖'} Audio</action>
                <action onClick={() => dispatch(toggleVideoMediaType())} className={(isMediaVideo ? 'success' : 'error') + ' button'}>{isMediaVideo ? '✔' : '✖'} Video</action>
                <action onClick={() => dispatch(toggleImageMediaType())} className={(isMediaImage ? 'success' : 'error') + ' button'}>{isMediaImage ? '✔' : '✖'} Image</action>
              </div>
            </form_group>

            <form_group>
              <label for="search_title">Title</label>
              <input type="text" id='search_title' value={search.title} onChange={(e) => dispatch(setTitle(e.target.value))} />
              <action className={`${(search.title !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setTitle(''))} title="Reset Input Field.">X</action>
            </form_group>

            <form_group>
              <label for='search_description' >Description</label>
              <input type="text" id='search_description' value={search.description} onChange={(e) => dispatch(setDescription(e.target.value))} />
              <action className={`${(search.description !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setDescription(''))} title="Reset Input Field.">X</action>
            </form_group>

            <form_group>
              <label for='search_location' >Location</label>
              <input type="text" id='search_location' value={search.location} onChange={(e) => dispatch(setLocation(e.target.value))} />
              <action className={`${(search.location !== '') ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(setLocation(''))} title="Reset Input Field.">X</action>
            </form_group>

            <form_group>
              <label for='search_start_year' >Start Year</label>
              <input type="text" id='search_start_year' value={search.yearStart !== null ? search.yearStart : ''} onChange={(e) => dispatch(setYearStart(e.target.value))} />
              <action className={`${(search.yearStart !== null) ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(resetYearStart())} title="Reset Input Field.">X</action>
            </form_group>

            <form_group>
              <label for='search_end_year'>End Year</label>
              <input type="text" id='search_end_year' value={search.yearEnd} onChange={(e) => dispatch(setYearEnd(e.target.value))} />
              <action className={`${(search.yearEnd !== null) ? 'visible' : 'hidden'} inputReset`} onClick={(e) => dispatch(resetYearEnd())} title="Reset Input Field.">X</action>
            </form_group>
          </section>
        }
      </form>
    </filter>
  )
}

export default SearchListFiler;
