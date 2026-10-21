import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard/ProductCard";
import { useCart } from "../context/CartContext";

function Shop() {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const ordering = params.get("ordering") || "";
  const page = Math.max(1, Number(params.get("page")) || 1);
  const [query, setQuery] = useState(search);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  function changeFilter(name, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(name, value);
    else next.delete(name);
    next.delete("page");
    setParams(next);
  }

  useEffect(() => { setQuery(search); }, [search]);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    api.get("/products/", { params: { page, search: search || undefined, category: category || undefined, ordering: ordering || undefined } })
      .then(({ data }) => {
        if (!active) return;
        const list = Array.isArray(data) ? data : data.results || [];
        setProducts(list);
        setCount(data.count ?? list.length);
        setHasNext(Boolean(data.next));
      })
      .catch(() => { if (active) setError("Products could not be loaded. Please try again."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, category, ordering, page]);

  return (
    <main className="page shop-page">
      <div className="section-heading"><div><span className="eyebrow">Our collection</span><h1>Shop furniture</h1></div></div>
      <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); changeFilter("search", query.trim()); }}>
        <label className="filter-search">Search products
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sofa, table, oak..." type="search" />
        </label>
        <button type="submit" className="primary-button">Search</button>
        <label>Category
          <select value={category} onChange={(event) => changeFilter("category", event.target.value)}>
            <option value="">All categories</option>
            {["Chair", "Table", "Sofa", "Bed", "Wardrobe"].map((item) => <option value={item} key={item}>{item}</option>)}
          </select>
        </label>
        <label>Sort by
          <select value={ordering} onChange={(event) => changeFilter("ordering", event.target.value)}>
            <option value="">Featured</option>
            <option value="price">Price: low to high</option>
            <option value="-price">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </form>
      {loading && <p role="status">Loading products...</p>}
      {error && <p role="alert" className="error-message">{error}</p>}
      {!loading && !error && <p className="results-count">{count} product{count === 1 ? "" : "s"} found</p>}
      {!loading && !error && !products.length && <p>No products match your search. Try a different term or category.</p>}
      {!loading && !error && <div className="products-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />)}
      </div>}
      {!loading && !error && (page > 1 || hasNext) && <nav className="pagination" aria-label="Product pages">
        <button type="button" disabled={page <= 1} onClick={() => changeFilter("page", String(page - 1))}>← Previous</button>
        <span>Page {page}</span>
        <button type="button" disabled={!hasNext} onClick={() => { const next = new URLSearchParams(params); next.set("page", String(page + 1)); setParams(next); }}>Next →</button>
      </nav>}
    </main>
  );
}
export default Shop;
