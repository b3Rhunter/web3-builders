import {useState} from 'react';

function VideoThumbnail({ videoId, title }) {
    const [clicked, setClicked] = useState(false);
  
    if (clicked) {
      return (
        <iframe 
          className='thumb'
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      );
    }
  
    return (
      <div className='thumb' onClick={() => setClicked(true)} style={{ cursor: 'pointer' }}>
        <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={title} />
      </div>
    );
  }

  export default VideoThumbnail;