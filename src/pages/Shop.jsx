import React, { useState, useEffect, useRef } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row } from "reactstrap";
import "../styles/shop.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import ProductsList from "../components/UI/ProductsList";
import AudioPlayer from 'react-h5-audio-player';

const Shop = ({ category }) => {
  const [productsData, setProductsData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(24);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const readCountRef = useRef(0);
  const [currentSong, setCurrentSong] = useState(null);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "songs"));
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter products by selected category
      const filtered = category
        ? products.filter((item) => item.category === category)
        : products;

      setProductsData(filtered);
      setFilteredProducts(filtered);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching products: ", error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // set the search term
  };
  
  // Effect hook to handle filter updates after search term changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, selectedSubCategory, selectedSort]);  // Run whenever any filter criteria changes
  
  
  
  
  
  const applyFilters = () => {
    console.log("Applying filters...");
    let filtered = productsData;
  
    // Category filter
    if (selectedCategory) {
      console.log("Filtering by category:", selectedCategory);
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
  
    // Subcategory filter
    if (selectedSubCategory) {
      console.log("Filtering by subcategory:", selectedSubCategory);
      filtered = filtered.filter(item => item.subCategory === selectedSubCategory);
    }
  
    // Sorting
    if (selectedSort === "price-low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }
  
    // Search term filter
    if (searchTerm) {
      console.log("Filtering by search term:", searchTerm);
      filtered = filtered.filter(item => {
        const titleLower = item.title.toLowerCase();
        return titleLower.includes(searchTerm.toLowerCase());
      });
    }
  
    console.log("Filtered products:", filtered);
    setFilteredProducts(filtered);
  };
  
  
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Helmet title="Songs">
      <CommonSection title="Songs" hideOnMobile={true}/>

      <section className="stick-section">
        <Container>
          <Row>
            <div className="search_box_cont" >
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search Song ..."
                  onChange={handleSearch}
                  value={searchTerm}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      
        <Container>
          <Row className="dffdd">
            {currentProducts.length === 0 ? (
              <div className="fullload">
                <div class="loader"></div> 
              </div>
            ) : (
              <>
                <ProductsList data={currentProducts}  onPlaySong={handlePlaySong}/>
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={filteredProducts.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </>
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

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
          <button className="page-link" onClick={() => paginate(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Shop;
