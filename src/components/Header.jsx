import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const productCount = useSelector((state) => state.cart.productCount);
  return (
    <header className="header">
      <Link to="/" className="header-logo"><span style={{ color: "gold" }}> DIADEM </span></Link>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/">Collections</Link>
        <Link to="/">Atelier</Link>
      </nav>
      <Link to="/cart" className="cart-btn">
        <FontAwesomeIcon icon={faCartShopping} />
        <span>Bag</span>
        {productCount > 0 && <span className="cart-count">{productCount}</span>}
      </Link>
    </header>
  );
};

export default Header;
