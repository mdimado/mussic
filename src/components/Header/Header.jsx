import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import useAuth from '../../custom-hooks/useAuth';
import logo from "../../assets/images/eco-logo.png";
import userIcon from '../../assets/images/account-circle-line.png';
import './header.css';

const categoryOptions = [
  "Pop",
  "Rock",
  "Hip-Hop/Rap",
  "Electronic/Dance",
  "R&B/Soul",
  "Classical",
];

const nav__links = [
  { path: 'home', display: 'Home' },
  { path: 'songs', display: 'Songs' },
  ...categoryOptions.map((category) => ({
    path: category.toLowerCase().replace(/\s+/g, "-"),
    display: category,
  })),
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalFav = useSelector(state => state.fav.totalQuantity);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out');
        navigate('/home');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  // Check if currentUser and currentUser.displayName are defined before splitting
  const firstName = currentUser && currentUser.displayName ? currentUser.displayName.split(' ')[0] : 'Guest';

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');
  const navigateToCart = () => navigate('/cart');
  const navigateToFav = () => navigate('/fav');
  const navigateToUpload = () => navigate('/upload');
  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row className="header0">
          <div className="nav__wrapper">
            <div className="logo">
              <Link to='/home'><h1 className="logofont"> Music</h1></Link>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink 
                      to={item.path} 
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              {currentUser && (
                <>
                <span className="fav__icon" onClick={navigateToFav}>
                  <p>My Favourites<i className="ri-heart-3-fill"></i></p>
                </span>
                <span className="fav__icon" onClick={navigateToUpload}>
                  <p>Upload songs<i class="ri-add-fill"></i></p>
                </span>
</>
                
              )}
              {currentUser ? (
                <div className="profile">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser.photoURL || userIcon}
                    alt=""
                    onClick={toggleProfileActions}
                  />
                  <span>{firstName}</span>
                  <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <span onClick={logout}>Logout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to='/signup'>Signup</Link>
                  <Link to='/login'>Login</Link>
                </div>
              )}

              <div className="mobile__menu">
                <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
