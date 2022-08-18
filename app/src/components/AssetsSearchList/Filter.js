import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQ, setYearEnd, setYearStart, startNewSearch, resetYearStart, resetYearEnd, toggleImageMediaType, toggleVideoMediaType, toggleAudioMediaType, setTitle, setDescription, setLocation } from '../../store/nasaAssetsSlice';

import { FormGroup } from '..';

function SearchListFiler() {
  const dispatch = useDispatch();
  const { collection, search } = useSelector(x => x.nasaAssets);

  const [advancedFiltersStatus, setAdvancedFiltersStatus] = useState(false);

  let totalPages = Math.ceil((collection?.metadata?.total_hits || 0) / 100);

  if (totalPages > 100) totalPages = 100;

  const submittinForm = (e) => {
    e.preventDefault();
    dispatch(startNewSearch());
    if (advancedFiltersStatus === true) setAdvancedFiltersStatus(false);
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

            <FormGroup label="Media Type" elements={
              <div>
                <action onClick={() => dispatch(toggleAudioMediaType())} className={(isMediaAudio ? 'success' : 'error') + ' button'}>{isMediaAudio ? '✔' : '✖'} Audio</action>
                <action onClick={() => dispatch(toggleVideoMediaType())} className={(isMediaVideo ? 'success' : 'error') + ' button'}>{isMediaVideo ? '✔' : '✖'} Video</action>
                <action onClick={() => dispatch(toggleImageMediaType())} className={(isMediaImage ? 'success' : 'error') + ' button'}>{isMediaImage ? '✔' : '✖'} Image</action>
              </div>
            } />

            <FormGroup id="search_title" label="Title" type="text" value={search.title} emptyValue="" onChange={(e) => dispatch(setTitle(e.target.value))} resetClick={(e) => dispatch(setTitle(''))} />

            <FormGroup id="search_description" label="Description" type="text" value={search.description} emptyValue="" onChange={(e) => dispatch(setDescription(e.target.value))} resetClick={(e) => dispatch(setDescription(''))} />

            <FormGroup id="search_location" label="Location" type="text" value={search.location} emptyValue="" onChange={(e) => dispatch(setLocation(e.target.value))} resetClick={(e) => dispatch(setLocation(''))} />

            <FormGroup id="search_start_year" label="Start Year" type="text" value={search.yearStart !== null ? search.yearStart : ''} emptyValue={''} onChange={(e) => dispatch(setYearStart(e.target.value))} resetClick={(e) => dispatch(resetYearStart())} />

            <FormGroup id="search_end_year" label="End Year" type="text" value={search.yearEnd !== null ? search.yearEnd : ''} emptyValue={''} onChange={(e) => dispatch(setYearEnd(e.target.value))} resetClick={(e) => dispatch(resetYearEnd())} />

          </section>
        }
      </form>
    </filter>
  )
}

export default SearchListFiler;
