import { useState } from "react";
import { useDispatch } from "react-redux";
import {updateProductQuantity,removeProductFromCart} from "../slices/Slice";

const CardForCart = ({ product }) => {
  const dispatch = useDispatch();

  const [inputQty, setInputQty] = useState(product.quantity);
  const [showInput, setShowInput] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const MAX_QUANTITY = 500;

  const handleSelectChange = (e) => {
    const value = Number(e.target.value);

    setShowWarning(false);

    if (value < 10) {
      setShowInput(false);
      setInputQty(value);

      dispatch(
        updateProductQuantity({
          id: product.id,
          quantity: value,
        })
      );
    } else {
      setShowInput(true);
      setInputQty("10");

      dispatch(
        updateProductQuantity({
          id: product.id,
          quantity: 10,
        })
      );
    }
  };

  const handleUpdate = () => {
    if (inputQty === "") return;

    if (Number(inputQty) < 1) {
      setInputQty("1");

      dispatch(
        updateProductQuantity({
          id: product.id,
          quantity: 1,
        })
      );

      setShowWarning(false);
      return;
    }

    if (Number(inputQty) > MAX_QUANTITY) {
      setInputQty("1");

      dispatch(
        updateProductQuantity({
          id: product.id,
          quantity: 1,
        })
      );

      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    dispatch(
      updateProductQuantity({
        id: product.id,
        quantity: Number(inputQty),
      })
    );
  };

  const total = (
    product.price * product.quantity
  ).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="item-info">
        <h3 className="item-title">
          {product.title}
        </h3>

        <p className="item-status">
          In Stock
        </p>

        <div className="item-qty">
          {!showInput ? (
            <select
              className="qty-select"
              value={product.quantity}
              onChange={handleSelectChange}
            >
              {[1,2,3,4,5,6,7,8,9].map(
                (num) => (
                  <option
                    key={num}
                    value={num}
                  >
                    {num}
                  </option>
                )
              )}

              <option value={10}>
                10+
              </option>
            </select>
          ) : (
            <>
              <input
                type="number"
                min="1"
                className="qty-input"
                value={inputQty}
                onChange={(e) =>
                  setInputQty(e.target.value)
                }
              />

              <button
                className="update-btn"
                onClick={handleUpdate}
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>

      <div className="cart-price">
        <span className="item-price">
          ${product.price}
        </span>

        <div className="item-total">
          <span className="label">
            Total:
          </span>{" "}
          <span className="value">
            ${total}
          </span>
        </div>

        {showWarning && (
          <p className="stock-msg">
            Only 500 quantity available.
          </p>
        )}

        <button
          className="remove-btn"
          onClick={() =>
            dispatch(
              removeProductFromCart(
                product.id
              )
            )
          }
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CardForCart;