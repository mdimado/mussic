import React from 'react';
import logo from "../assets/images/logo.jpeg"
import rock_playlist_img from "../assets/images/rock-playlist-image.jpg"
import disco_playing_image from "../assets/images/disco-playlist-img.jpg"
import pop_playlist_image from "../assets/images/pop-playlist-image.jpg"
import classical_playlist_image from "../assets/images/classical-playlist-image.jpg"
import hiphop_playlist_image from "../assets/images/hiphop-playlist-image.png"
import folk_playlist from "../assets/images/folk-playlist-image.jpg"
import music_sign from "../assets/images/music-symbol-sign.jpg"
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();


  const scrollPlaylist = (scrollOffset) => {
    const playlistList = document.querySelector(".explore-playlists .playlist-list");
    playlistList.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src={logo} alt="Logo" className="logo" />
        <hr className="separator" />

        <div className="library-section">
          <div className="library-heading">Your Library</div>
          <button className="add-button">+</button>
        </div>
        <div className="custom-music-note">
          Create Your Own Custom Music Playlist Here!!
        </div>
      </div>

      <div className="right-side">
        <nav>
          <input type="text" className="search-bar" placeholder="Search" />
          <a  onClick={() => navigate('/signup')} className="button">SignUp</a>
          <a onClick={() => navigate('/login')} className="button">LogIn</a>
        </nav>

        <div className="explore-playlists">
          <h2 className="side-heading">Explore Playlists!</h2>
          <button
            id="explore-playlists-scroll-left"
            className="scroll-button scroll-button-left"
            onClick={() => scrollPlaylist(-100)}
          >
            &#10094;
          </button>

          <div className="playlist-list">
            {/* Rock Playlist */}
            <a onClick={() => navigate('/streaming')} style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={rock_playlist_img} alt="Rock Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Rock</div>
                  <div className="playlist-description">Rhythm and aesthetic</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>

            {/* Disco Playlist */}
            <a onClick={() => navigate('/streaming')} style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={disco_playing_image} alt="Disco Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Disco</div>
                  <div className="playlist-description">Funk, soul, pop, salsa, and psychedelic music</div>
                </div>
                <button className="playlist-play-button"></button>
              </div>
            </a>

            {/* Pop Playlist */}
            <a onClick={() => navigate('/streaming')}  style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={pop_playlist_image} alt="Pop Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Pop Music</div>
                  <div className="playlist-description">Relevant and trending</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>

            {/* Classical Playlist */}
            <a onClick={() => navigate('/streaming')}  style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={classical_playlist_image} alt="Classical Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Classical</div>
                  <div className="playlist-description">Predominance of homophonic harmony</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>

            {/* Hip Hop Playlist */}
            <a onClick={() => navigate('/streaming')}  style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={hiphop_playlist_image} alt="Hip Hop Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Hip Hop</div>
                  <div className="playlist-description">Musical style incorporating rhythmic and/or rhyming speech</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>

            {/* Folk Playlist */}
            <a onClick={() => navigate('/streaming')} style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={folk_playlist} alt="Folk Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Folk Music</div>
                  <div className="playlist-description">Predominance of homophonic harmony</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>

            {/* Popular Music Playlist */}
            <a onClick={() => navigate('/streaming')}  style={{ textDecoration: 'none' }}>
              <div className="playlist-card">
                <img src={music_sign} alt="Popular Music Playlist" className="playlist-image" />
                <div className="playlist-info">
                  <div className="playlist-name">Popular Music</div>
                  <div className="playlist-description">Enjoy the best ones</div>
                </div>
                <button className="playlist-play-button">&#9658;</button>
              </div>
            </a>
          </div>

          <button
            id="explore-playlists-scroll-right"
            className="scroll-button scroll-button-right"
            onClick={() => scrollPlaylist(100)}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
