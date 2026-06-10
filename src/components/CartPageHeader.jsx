import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

const CartPageHeader = () => (
  <header className="cart-page-header">
    <Link to="/" className="cart-header-logo"><span> DIADEM</span></Link>
    <nav className="cart-header-nav">
      <Link to="/">Home</Link>
      <Link to="/">Collections</Link>
    </nav>
    <Link to="/" className="back-btn">
      <FontAwesomeIcon icon={faAnglesLeft} />
      <span>Continue Shopping ~</span>
    </Link>
  </header>
);

export default CartPageHeader;
