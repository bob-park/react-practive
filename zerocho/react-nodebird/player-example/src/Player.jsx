import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import VideoThumbnail from "react-video-thumbnail";

const Player = () => {
  const [seek, setSeek] = useState(0);
  const [extract, setExtract] = useState(false);

  const video = useRef();

  const handleExtractOnPause = () => {
    const currentTime = Math.floor(video.current.getCurrentTime());

    console.log(currentTime);

    setSeek(currentTime);
    setExtract(true);
  };

  return (
    <div>
      <ReactPlayer
        url="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
        light={
          "https://cdn-images-1.medium.com/max/2400/1*y6C4nSvy2Woe0m7bWEn4BA.png"
        }
        controls={true}
        playing
        ref={video}
        onPause={handleExtractOnPause}
        width="400px"
      />

      <button onClick={() => setExtract(false)}>다시</button>

      {extract && (
        <VideoThumbnail
          videoUrl="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1"
          thumbnailHandler={thumbnail => {
            console.log("handler 실행");
            console.log(thumbnail);
          }}
          width={400}
          height={300}
          snapshotAtTime={seek}
          renderThumbnail={false}
        />
      )}
    </div>
  );
};

export default Player;
