import { useEffect, useRef } from "react";
import { useMusic } from "../contexts/MusicContext";
export const MusicPlayer = () => {
  const {
    currentTrack,
    formatTime,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    isPlaying,
    play,
    pause,
    nextTrack,
    prevTrack,
    volume,
    setVolume,
  } = useMusic();
  const audioRef = useRef(null);

  const handleTimeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.log(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetatdata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetatdata);
    audio.addEventListener("canplay", handleLoadedMetatdata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetatdata);
      audio.removeEventListener("canplay", handleLoadedMetatdata);

      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, setDuration, setCurrentTime, nextTrack, nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack, setCurrentTime, setDuration]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        crossOrigin="anonymous"
      />
      <div className="track-info">
        <h3 className="track-title">{currentTrack.title}</h3>
        <p className="track-artist">{currentTrack.artist}</p>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          step={0.1}
          className="progress-bar"
          onChange={handleTimeChange}
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button
          className="control-btn"
          onClick={() => prevTrack(currentTrack.id)}
        >
          ⏮️
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button
          className="control-btn"
          onClick={() => nextTrack(currentTrack.id)}
        >
          ⏭️
        </button>
      </div>

      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          className="volume-bar "
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          value={volume}
        />
      </div>
    </div>
  );
};
