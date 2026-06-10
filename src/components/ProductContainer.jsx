import { useSelector } from "react-redux";
import Card from "./Card";

const ProductContainer = () => {
  const products = useSelector((state) => state.cart.products);
  return (
    <div className="products-container">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductContainer;
