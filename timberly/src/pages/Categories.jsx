import "../components/Categories/Categories.css";
import Navbar from "../components/Navbar/Navbar";

const categories = [
  {
    id: 1,
    name: "Sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Dining",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chairs",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Storage",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Office Furniture",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
];

function Categories() {
  return (
    <>
      <Navbar />

      <section className="categories-page">

        <h1>Shop By Category</h1>

        <p>
          Explore premium wooden furniture crafted for every room in your home.
        </p>

        <div className="category-grid">

          {categories.map((category) => (
            <div className="category-card" key={category.id}>

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-content">
                <h3>{category.name}</h3>

                <button>Explore →</button>
              </div>

            </div>
          ))}

        </div>

      </section>
    </>
  );
}

export default Categories;