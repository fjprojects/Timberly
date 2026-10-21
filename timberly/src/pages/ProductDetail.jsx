import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  useEffect(() => {
    let active = true;
    api.get(`/products/${id}/`)
      .then(({ data }) => { if (active) setProduct(data); })
      .catch(() => { if (active) setError("This product could not be found."); });
    return () => { active = false; };
  }, [id]);
  if (error) return <main className="page"><p role="alert">{error}</p><Link to="/shop">Back to shop</Link></main>;
  if (!product) return <main className="page"><p>Loading product...</p></main>;
  return (
    <main className="page">
      <Link to="/shop" className="text-link">← Back to shop</Link>
      <section className="product-detail">
        <img src={product.image || "https://placehold.co/800x600?text=Timberly"} alt={product.name} />
        <div>
          <span className="eyebrow">{product.category} · SKU {product.sku}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="detail-price">₹{Number(product.price).toLocaleString("en-IN")}</p>
          <p>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>
          <button type="button" className="primary-button" disabled={!product.is_available || product.stock <= 0} onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </section>
    </main>
  );
}
export default ProductDetail;
