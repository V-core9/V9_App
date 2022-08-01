import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


//import './nasa.scss';

function AssetViewPage() {
  const { nasa_id } = useParams();

  const [data, setData] = useState({});
  const [audioSrc, setAudioSrc] = useState('');
  const [videoSrc, setVideoSrc] = useState('');

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  useEffect(() => {

    fetch(`https://images-api.nasa.gov/search?nasa_id=${nasa_id}`, requestOptions)
      .then(response => response.text())
      .then(result => setData(JSON.parse(result)))
      .catch(error => console.log('error', error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const info = data.collection?.items[0].data[0] || {};
  console.log(data);

  const isImage = info.media_type === 'image';
  const isAudio = info.media_type === 'audio';
  const isVideo = info.media_type === 'video';

  if (data !== {}) {
    if (isAudio && audioSrc === '') {
      console.log('getting AUDIO data');

      fetch(data.collection.items[0].href, requestOptions)
        .then(response => response.text())
        .then(result => setAudioSrc(JSON.parse(result)[0]))
        .catch(error => console.log('error', error));
    }
    if (isVideo && videoSrc === '') {
      console.log('getting VIDEO data');

      fetch(data.collection.items[0].href, requestOptions)
        .then(response => response.text())
        .then(result => {
          let rez = JSON.parse(result);
          rez.forEach(item => {
            const parseHelper = item.split('.');
            const fileExtension = parseHelper[parseHelper.length - 1];
            if (fileExtension === 'mp4') setVideoSrc(item);
          });
        })
        .catch(error => console.log('error', error));
    }
  }

  return (
    <section>

      <header>
        <div className="flexRow">
          <button onClick={(e) => window.history.back()}>Back</button>
          <h2>{info.title}</h2>
        </div>
      </header>


      <article className="gallery">
        <div>
          {isImage && <img src={data.collection?.items[0].links[0].href} alt={info.title} />}
          {
            audioSrc !== '' &&
            <audio controls>
              <source src={audioSrc} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          }
          {
            videoSrc !== '' &&
            <video controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
        </div >

        <div>

          <section className="baseInfo">
            <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
          </section>

          <section className="keywords">
            <h2>Keywords:</h2>
            <keywords>
              {info.keywords?.map(item => <p>{item}</p>)}
            </keywords>
          </section>

          {info.photographer && <p>📸 Photographer: {info.photographer}</p>}
          {info.location && <p>📍 Location: {info.location}</p>}
          <small>Post ID: {nasa_id}</small>
        </div>
      </article>
    </section>
  );
};

export { AssetViewPage };
