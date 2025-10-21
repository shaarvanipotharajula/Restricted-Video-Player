import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import sampleVideo from './sample.mp4';

function App() {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  };

  const playVideo = () => {
    const video = videoRef.current;
    video.muted = false; // Enable sound
    video.play();
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    video.pause();
    setIsPlaying(false);
  };

  const increaseVolume = () => {
    const video = videoRef.current;
    let newVolume = Math.min(video.volume + 0.1, 1);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const video = videoRef.current;
    let newVolume = Math.max(video.volume - 0.1, 0);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="App">
      <h1>Restricted Video Player</h1>
      <div className="video-container">
        <video
          ref={videoRef}
          src={sampleVideo}
          controls={false} // hide default controls
          style={{ width: '80%', maxWidth: '800px' }}
        />
        <div className="controls">
          {!isPlaying ? (
            <button onClick={playVideo}>▶ Play</button>
          ) : (
            <button onClick={pauseVideo}>⏸ Pause</button>
          )}
          <button onClick={decreaseVolume}>- Volume</button>
          <button onClick={increaseVolume}>+ Volume</button>
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
