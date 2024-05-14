import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ReactAudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/product-details.css";
import ProductsLis from "../components/UI/ProductsLis";
import useAuth from "../custom-hooks/useAuth";
import { updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { favActions } from "../redux/slices/favSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherRecipes, setOtherRecipes] = useState([]);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [userRated, setUserRated] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const songRef = doc(db, "songs", id);
        const songSnap = await getDoc(songRef);

        if (songSnap.exists()) {
          const songData = songSnap.data();
          setSong(songData);
          setRating(songData.rating || 0);
          setNumReviews(songData.numReviews || 0);

          if (currentUser) {
            const userRatedRef = doc(db, "user_ratings", `${id}_${currentUser.uid}`);
            const userRatedSnap = await getDoc(userRatedRef);
            if (userRatedSnap.exists()) {
              setUserRated(true);
              setUserRating(userRatedSnap.data().rating);
            }
          }

          setLoading(false);
        } else {
          toast.error("Song not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching song:", error);
        toast.error("An error occurred while fetching the song");
        navigate("/");
      }
    };

    fetchSong();
  }, [id, navigate, currentUser]);

  const handleRating = async (newRating) => {
    try {
      if (!currentUser) {
        toast.error("Please log in to rate the song.");
        return;
      }

      if (userRated) {
        toast.error("You have already rated this song.");
        return;
      }

      const userRatedRef = doc(db, "user_ratings", `${id}_${currentUser.uid}`);
      await updateDoc(userRatedRef, { rating: newRating });

      const updatedRating = (rating * numReviews + newRating) / (numReviews + 1);
      const songRef = doc(db, "songs", id);
      await updateDoc(songRef, { rating: updatedRating, numReviews: numReviews + 1 });

      setRating(updatedRating);
      setNumReviews(numReviews + 1);
      setUserRated(true);
      setUserRating(newRating);

      toast.success("Thank you for rating this song!");
    } catch (error) {
      console.error("Error updating rating:", error);
      toast.error("An error occurred while updating the rating");
    }
  };

  const starIcons = [];
  const roundedRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    starIcons.push(
      <i
        key={i}
        className={i < roundedRating ? "ri-star-fill" : "ri-star-line"}
      />
    );
  }

  const rateRecipeStars = [];
  for (let i = 0; i < 5; i++) {
    rateRecipeStars.push(
      <i
        key={i}
        className={i < hoverRating ? "ri-star-fill" : "ri-star-line"}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => handleRating(i + 1)}
      />
    );
  }

  const handleAddToFavorites = () => {
    if (!song) return;

    dispatch(favActions.addItem(song));
    toast.success("Song added to favorites!");
  };

  if (loading) {
    return (
      <div className="fullload">
        <div className="loader"></div>
      </div>
    );
  }

  if (!song) {
    return <div>Song not found</div>;
  }

  const { title, imgUrl } = song;

  return (
    <Helmet title={title}>
      <CommonSection className="commsect" title={title} hideOnMobile={true} />

      <section className="pt-0">
        <Container>
          <Row className="space">
            <Col className="padddd" lg="9">
              <div className="image">
                <img src={imgUrl} alt={title} />
              </div>
              <div className="context">
                <h1 className="recipe_title">{title}</h1>
                <div className="mt-4 island">
                  <h4>Listen to the Song:</h4>
                  <ReactAudioPlayer
                    src={song.songUrl} // Assuming `songUrl` is the MP3 URL
                    autoPlay={false}
                    controls
                    className="audio-player"
                    playing={isPlaying}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>
                <div className="rating">
                  {starIcons}
                  <span>({numReviews} Reviews)</span>
                </div>
              </div>
            </Col>
            <Col lg="3">
              <div className="mt-4 island">
                {currentUser && !userRated && (
                  <div className="rate-recipe">
                    <h4>Rate this Song:</h4>
                    <div className="rate-recipe-stars">{rateRecipeStars}</div>
                  </div>
                )}
                <button onClick={handleAddToFavorites}>Add to Favorites</button>
              </div>
              <div className="mt-5 islanno island">
                <h4>Other Songs:</h4>
                <ProductsLis data={otherRecipes} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
