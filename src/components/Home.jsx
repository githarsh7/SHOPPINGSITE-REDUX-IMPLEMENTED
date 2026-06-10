import Header from "./Header";
import Banner from "./Banner";
import ProductsContainer from "./ProductContainer";

const Home = () => (
  <>
    <Header />
    <Banner />
    <div className="section-header">
      <p className="section-eyebrow">The DESINATION</p>
      <h2 className="section-title">THE COLLECTION</h2>
    </div>
    <ProductsContainer />
    <footer className="site-footer">© 2025 DIADEM — All Rights Reserved</footer>
  </>
);
export default Home;
