import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-solid-svg-icons';

interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  likes: number;
  views: number;
}

const videos: Video[] = [
  { id: '1', title: 'Pool Boi', thumbnailUrl: 'video1-thumbnail.jpg', likes: 69, views: 420 },
  { id: '2', title: 'Off Button', thumbnailUrl: 'video2-thumbnail.jpg', likes: 69, views: 269 },
  { id: '3', title: 'Bet', thumbnailUrl: 'video3-thumbnail.jpg', likes: 69, views: 420 },
  { id: '4', title: 'The Big Day', thumbnailUrl: 'video4-thumbnail.jpg', likes: 69, views: 420 },
  { id: '5', title: 'Kill Switch', thumbnailUrl: 'video5-thumbnail.jpg', likes: 69, views: 269 },
  { id: '6', title: 'Valentines Day', thumbnailUrl: 'video6-thumbnail.jpg', likes: 69, views: 420 },
  { id: '7', title: 'Thoon', thumbnailUrl: 'video7-thumbnail.jpg', likes: 69, views: 420 },
  { id: '8', title: 'Comeback Kid', thumbnailUrl: 'video8-thumbnail.jpg', likes: 69, views: 269 },
  { id: '9', title: 'Airdrop Day', thumbnailUrl: 'video9-thumbnail.jpg', likes: 69, views: 420 },
];

const adImages = ['/ad1.png', '/ad3.png', '/ad6.png'];

const getRandomAdImage = () => {
  const randomIndex = Math.floor(Math.random() * adImages.length);
  return adImages[randomIndex];
};

const VideoLandingPage: React.FC = () => {
  const [randomAdImage, setRandomAdImage] = useState('');

  useEffect(() => {
    setRandomAdImage(getRandomAdImage());
  }, []);

  return (
    <div className="container">
      <div className="ad-banner-horizontal">
        {/* Display the randomly selected ad banner */}
        <img src={randomAdImage} alt="Advertisement" />
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-item" key={video.id}>
            <a href={`/video/${video.id}`}>
              <img src={video.thumbnailUrl} alt={video.title} />
            </a>
            <div className="video-details">
              <div className="title-section">
                <p className="video-title">{video.title}</p>
                <div className="metadata">
                  <div className="likes">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{video.likes}%</span>
                  </div>
                  <div className="views">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLandingPage;
