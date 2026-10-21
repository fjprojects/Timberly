import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Hero from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;
    api.get("/products/")
      .then(({ data }) => {
        if (active) setProducts((Array.isArray(data) ? data : data.results || []).slice(0, 4));
      })
      .catch(() => { if (active) setError("Featured products are unavailable right now."); });
    return () => { active = false; };
  }, []);

  return (
    <>
      <Hero />
      <main className="page">
        <div className="section-heading">
          <div><span className="eyebrow">Handpicked for you</span><h2>Featured furniture</h2></div>
          <Link to="/shop" className="text-link">Browse all products →</Link>
        </div>
        {error && <p role="alert" className="error-message">{error}</p>}
        {!error && !products.length && <p>Loading our collection...</p>}
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
          ))}
        </div>
      </main>
    </>
  );
}
export default Home;
