import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../slices/Slice";
import { useState } from "react";
import Header from "./Header";

const StarRating = ({ rate, big }) => (
  <div className={big ? "stars-big" : "card-stars"}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= Math.round(rate) ? "star filled" : "star"}>
        ★
      </span>
    ))}
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("description");

  const products = useSelector((state) => state.cart.products);
  const addedProducts = useSelector((state) => state.cart.addedProducts);

  const product = products.find((p) => p.id === Number(id));
  const isAdded = addedProducts.find((item) => item.id === product?.id);

  if (!product) {
    return (
      <>
        <Header />
        <div className="detail-not-found">
          <p>Product not found.</p>
          <Link to="/" className="back-to-shop">← Back to Collection</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <button onClick={() => navigate("/")} className="breadcrumb-link">
          Home
        </button>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-link">{product.category}</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{product.title}</span>
      </div>

      <div className="detail-page">
        {/* LEFT — Image */}
        <div className="detail-image-col">
          <div className="detail-image-frame">
            <img src={product.image} alt={product.title} className="detail-img" />
            {product.stock <= 5 && (
              <div className="detail-low-stock-badge">
                Only {product.stock} left
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div className="detail-info-col">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating-row">
            <StarRating rate={product.rating.rate} big />
            <span className="detail-rating-text">
              {product.rating.rate} out of 5 · {product.rating.count} reviews
            </span>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">${product.price}</span>
            <span className={`detail-stock-badge ${product.stock <= 5 ? "low" : "ok"}`}>
              {product.stock <= 5
                ? `⚠ Only ${product.stock} units left`
                : `✓ In Stock (${product.stock} available)`}
            </span>
          </div>

          <div className="detail-divider" />

          {/* Tabs */}
          <div className="detail-tabs">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`detail-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "reviews" && ` (${product.reviews.length})`}
              </button>
            ))}
          </div>

          <div className="detail-tab-content">
            {activeTab === "description" && (
              <p className="detail-description">{product.description}</p>
            )}

            {activeTab === "details" && (
              <ul className="detail-list">
                {product.details.map((item, i) => (
                  <li key={i} className="detail-list-item">
                    <span className="detail-bullet">—</span> {item}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "reviews" && (
              <div className="detail-reviews">
                {product.reviews.map((rev, i) => (
                  <div key={i} className="review-card">
                    <div className="review-header">
                      <span className="review-name">{rev.name}</span>
                      <StarRating rate={rev.rating} />
                    </div>
                    <p className="review-comment">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="detail-divider" />

          {/* CTA */}
          <div className="detail-cta-row">
            {isAdded ? (
              <button
                className="detail-add-btn added"
                onClick={() => dispatch(removeProductFromCart(product.id))}
              >
                ✓ Added to Bag — Remove
              </button>
            ) : (
              <button
                className="detail-add-btn"
                onClick={() => dispatch(addProductToCart(product))}
              >
                Add to Bag
              </button>
            )}
            <Link to="/cart" className="detail-cart-link">
              View Bag →
            </Link>
          </div>

          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            ← Back to Collection
          </button>
        </div>
      </div>

      <footer className="site-footer">
        © 2025 Maison Dorée — All Rights Reserved
      </footer>
    </>
  );
};

export default ProductDetail;
