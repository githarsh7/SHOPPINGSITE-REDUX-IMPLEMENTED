import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/product/:id", element: <ProductDetail /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
