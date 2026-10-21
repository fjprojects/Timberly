import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  const available = product.is_available !== false && product.stock > 0;
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-image">
        <img src={product.image || "https://placehold.co/600x450?text=Timberly"} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <span className="eyebrow">{product.category}</span>
        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
        <p className="product-description">{product.description || "Carefully selected furniture for your home."}</p>
        <p className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</p>
        <p className="stock-label">{available ? `${product.stock} in stock` : "Out of stock"}</p>
        <button type="button" onClick={addToCart} disabled={!available} className="primary-button">
          {available ? "Add to cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}
export default ProductCard;
