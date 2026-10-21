import { Link } from "react-router-dom";
import "../components/Categories/Categories.css";

const categories = [
  { name: "Sofas", value: "Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" },
  { name: "Beds", value: "Bed", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80" },
  { name: "Dining tables", value: "Table", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=800&q=80" },
  { name: "Chairs", value: "Chair", image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80" },
  { name: "Wardrobes", value: "Wardrobe", image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80" },
];

function Categories() {
  return (
    <main className="page categories-page">
      <span className="eyebrow">Room by room</span>
      <h1>Shop by category</h1>
      <p>Explore furniture crafted for every space in your home.</p>
      <div className="category-grid">
        {categories.map(({ name, value, image }) => (
          <Link className="category-card" key={value} to={`/shop?category=${encodeURIComponent(value)}`}>
            <img src={image} alt={name} loading="lazy" />
            <h3>{name} →</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
export default Categories;
