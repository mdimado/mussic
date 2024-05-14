import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';
import "./layout.css";

const Layout = () => {
  return (
    <div className="main">
      <div className="headerrr">
        <div className="fixed">
          <Header />
        </div>
      </div>
      <div className="layout">
        <div className="scrollable">
          <Routers />
          <div className="black"></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
