import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCart } from "../context/CartContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products/");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Products could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="shop-page">
      <h1>Shop</h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </main>
  );
}

export default Shop;