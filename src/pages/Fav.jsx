import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import '../styles/cart.css';
import { motion } from "framer-motion";
import { favActions } from "../redux/slices/favSlice";
import { cartActions } from "../redux/slices/cartSlice";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

const Fav = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favItems = useSelector((state) => state.fav.favItems);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [itemToMoveToCart, setItemToMoveToCart] = React.useState(null);
  const [isMoveToCartModalOpen, setMoveToCartModalOpen] = React.useState(false);

  const deleteFavItem = (itemId) => {
    setItemToDelete(itemId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete) {
      dispatch(favActions.removeItem(itemToDelete));
      toast.success("Item removed from favorites");
      setDeleteModalOpen(false);
    }
  };

  const handleMoveToCartConfirmation = () => {
    if (itemToMoveToCart) {
      dispatch(cartActions.addItem(itemToMoveToCart));
      dispatch(favActions.deleteItem(itemToMoveToCart.id));
      toast.success("Item moved to cart");
      setMoveToCartModalOpen(false);
    }
  };

  return (
    <Helmet title="Favorites">
      <Container>
        <Row>
          <Col className='fav-items' lg="12">
          <div> <h1>Favourites</h1></div>
            {favItems.length === 0 ? (
              <div className="justify favbox">
                <h2 className="fs-4 text-center">
                  Nothing seems to be here <i className="ri-emotion-sad-line"></i>
                </h2>
                <p className="text-center mt-5">
                  Create a curated collection of your most cherished finds and
                  let them dance in the realm of your favorites.
                </p>
              </div>
            ) : (
              <section className='favorites'>
                {favItems.map((item, index) => (
                  <FavItem
                    item={item}
                    key={index}
                    deleteFavItem={deleteFavItem}
                  />
                ))}
              </section>
            )}
          </Col>
        </Row>
      </Container>
      {itemToDelete && (
        <Modal isOpen={isDeleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
          <ModalHeader toggle={() => setDeleteModalOpen(false)}>
            Confirm Removal
          </ModalHeader>
          <ModalBody>
            Are you sure you want to remove the item from your favorites?
          </ModalBody>
          <ModalFooter>
            <button className="buy__button btn-danger" onClick={handleDeleteConfirmation}>
              Yes, Remove
            </button>
            <button className="buy__button btn-secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
      {itemToMoveToCart && (
        <Modal isOpen={isMoveToCartModalOpen} toggle={() => setMoveToCartModalOpen(false)}>
          <ModalHeader toggle={() => setMoveToCartModalOpen(false)}>
            Confirm Move to Cart
          </ModalHeader>
          <ModalBody>
            Are you sure you want to move the item to your cart?
          </ModalBody>
          <ModalFooter>
            <button className="buy__button" onClick={handleMoveToCartConfirmation}>
              Yes, Move to Cart
            </button>
            <button className="buy__button btn-secondary" onClick={() => setMoveToCartModalOpen(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      )}
    </Helmet>
  );
};

const FavItem = ({ item, deleteFavItem }) => {
  return (
    <div className="fav-item">
      <div className="gridding">
        <div className="fav-item-image">
          <img src={item.imgUrl} alt={item.title} />
        </div>
        <div className="fav-item-title">
          {item.title}
        </div>
        <div className="fav-item-details">
          <div className="fav-item-actions">
            <motion.i
              whileTap={{ scale: 1.2 }}
              onClick={() => deleteFavItem(item.id)}
              className="ri-delete-bin-line"
            ></motion.i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fav;
