import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";
import hero from "../assets/images/hero.png";
import { useNavigate } from "react-router-dom";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trendingRef = useRef(null);
  const navigate = useNavigate();

  const [currentSong, setCurrentSong] = useState(null);



  const handleStartListeningClick = () => {
    trendingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
  };

  const productLimit = 10; 
  const { data: products, loading: productsLoading } = useGetData("songs", productLimit);

  const userLimit = 5;
  const { data: users, loading: usersLoading } = useGetData("users", userLimit);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row className="aliic">
            <Col lg='6'>
              <img src={hero} alt="hero" />
            </Col>
            <Col lg='6'>
              <h1>Discover Your New Favorite Song Today</h1>
              <p>Explore thousands of playlists to find music that moves you.</p>
              <div className="buttonn"><div></div><div onClick={handleStartListeningClick} className="button"><p>Start Listening</p></div></div>
            </Col>
          </Row>
        </Container>
      </section>

      <section ref={trendingRef} className="trending__products">
        <Container>
          <Row className="ddffd">
            <Col lg="12" className="text-center">
              <h2 className="section__title">Top picks</h2>
            </Col>
            {productsLoading ? (
              <div className="fullload">
                <div className="loader"></div>
              </div>
            ) : (
              <ProductsList data={products} onPlaySong={handlePlaySong} />
            )}
          </Row>
        </Container>
        <div className="nowplaying">
          {currentSong && (
            <>
            <div className="player"><div className="imageplayer">
              <img src={currentSong.imgUrl} alt="" />
              </div>
              <div className="playerrrr">
              <p>{currentSong.title}</p>
            <AudioPlayer
              autoPlay
              src={currentSong.songUrl}
              onPlay={e => console.log("onPlay")}
              // other props here
            />
                </div></div>
           </>
          )}
        </div>
      </section>
    </Helmet>
  );
};

export default Home;
