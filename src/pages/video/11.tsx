import React from 'react';
import { useParams } from 'react-router-dom';
import CommentsSection from 'components/Comments';

interface VideoParams {
  id: string;
}

const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

  // Fetch video data based on the ID
  // For demonstration purposes, let's assume you have video data available locally
  const videoData = {
    id: id,
    title: 'Are you a Believer?',
    videoUrl: `/video11.mp4`, // Assuming your video files are named like video1.mp4, video2.mp4, etc.
    description: 'Its time to start believing in PAWN. Are you a believer?',
  };

  return (
    <div className="container">
      <div className="video-container">
        <div className="sidebar-left">
          {/* Your ads or sidebar content on the left */}
          <img src="/ad4.png" alt="Advertisement" />
        </div>
        <div className="video-player-wrapper">
        
          <div className="video-player">
            <video controls>
              <source src={videoData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag. 
            </video>
            <h2>{videoData.title}</h2>
            <p className="video-description">{videoData.description}</p>
          </div>
          <div>
      {/* Include the CommentsSection component */}
      <CommentsSection />
    </div>
        </div>
        <div className="sidebar-right">
  {/* Your ads or sidebar content on the right */}
  <img src="/ad14.png" alt="Advertisement"/>
</div>
</div>
    </div>
  );
};

export default VideoPage;
