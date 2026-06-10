import { useSelector } from "react-redux";
import CardForCart from "./CardForCart";
import CartPageHeader from "./CartPageHeader";
import { Link } from "react-router-dom";
import cartImg from "../assets/cart.jpeg";

const Cart = () => {
  const addedProducts = useSelector((state) => state.cart.addedProducts);
  const subtotal = addedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const totalQuantity = addedProducts.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <CartPageHeader />
      <div className="cart-page">
        <p className="cart-page-eyebrow">Your Selection</p>
        <h2 className="cart-page-title">Shopping Bag</h2>

        {addedProducts.length === 0 ? (
          <div className="empty">
            <img src={cartImg} alt="Empty Bag" className="empty-cart-img" />
            <h2>Your Bag is Empty</h2>
            <p>Discover pieces made for you</p>
            <Link to="/" className="empty-cta">Browse Collection</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {addedProducts.map((product) => (
                <CardForCart key={product.id} product={product} />
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-summary-title">Order Summary</div>
              <div className="row"><span className="label">Subtotal</span><span className="value">${subtotal}</span></div>
              <div className="row"><span className="label">Items</span><span className="value">{totalQuantity}</span></div>
              <div className="row"><span className="label">Delivery</span><span className="free">Complimentary</span></div>
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-value">${subtotal}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout!</button>
            </div>
          </>
        )}
      </div>
      <footer className="site-footer">© 2025 DIADEM — All Rights Reserved</footer>
    </>
  );
};
export default Cart;
