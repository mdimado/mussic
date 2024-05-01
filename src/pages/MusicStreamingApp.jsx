import React, { useState } from 'react';
import ReactPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import invisible_beauty from "../assets/songs/invisible_beauty.mp3";
import "./musicstreaming.css";
import just_stay from  "../assets/songs/just_stay.mp3"
import liquid_time from "../assets/songs/liquid_time.mp3"
import silky_smooth from "../assets/songs/silky_smooth.mp3"
import { Col } from 'reactstrap';

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  const songs = [
    {
      name: 'Invisible Beauty',
      artist: '',
      url: invisible_beauty,
      cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Just Stay',
      artist: '',
      url: just_stay,
      cover: 'https://images.pexels.com/photos/838702/pexels-photo-838702.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Liquid Time',
      artist: '',
      url: liquid_time,
      cover: 'https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      name: 'Silky Smooth',
      artist: '',
      url: silky_smooth,
      cover: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
  ];

  const handleSongClick = (index) => {
    if (currentSongIndex === index) {
      // Toggle play/pause if the same song is clicked again
      setCurrentSongIndex(null);
    } else {
      setCurrentSongIndex(index);
    }
  };

  return (
    <div className="app">
      <h1>Rock Playlist</h1>
      <Col lg='8'>
      <div className="playlist">
        {songs.map((song, index) => (
          <div key={index} className="song-card" onClick={() => handleSongClick(index)}>
            <img src={song.cover} alt={song.name} />
            <p>{song.name}</p>
          </div>
        ))}
      </div></Col>
      {/* Render ReactPlayer at the bottom if a song is selected */}
      {currentSongIndex !== null && (
        <div className="react-player-container">
          <ReactPlayer
            className="react-player"
            src={songs[currentSongIndex].url}
            autoPlay
            controls
            onPause={() => setCurrentSongIndex(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
