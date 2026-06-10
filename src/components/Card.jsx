import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "../slices/Slice";

const StarRating = ({ rate }) => {
  return (
    <div className="card-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(rate) ? "star filled" : "star"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedProducts = useSelector((state) => state.cart.addedProducts);
  const isAdded = addedProducts.find((item) => item.id === product.id);

  const handleCardClick = (e) => {
    // Don't navigate if clicking button
    if (e.target.closest(".card-btn")) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-img-wrapper">
        <img src={product.image} alt={product.title} className="card-img" />
        <span className="card-category-badge">{product.category}</span>
        <div className="card-hover-overlay">
          <span className="card-hover-text">View Details</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <StarRating rate={product.rating.rate} />
        <p className="card-rating-text">
          {product.rating.rate} · {product.rating.count} reviews
        </p>
        <p className="card-stock">
          {product.stock <= 5
            ? `Only ${product.stock} left`
            : "In Stock"}
        </p>

        <div className="card-footer">
          <span className="card-price">${product.price}</span>
          {isAdded ? (
            <button
              className="card-btn added"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeProductFromCart(product.id));
              }}
            >
              In Bag ✓
            </button>
          ) : (
            <button
              className="card-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addProductToCart(product));
              }}
            >
              Add to Bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
