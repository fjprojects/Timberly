import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    let active = true;
    api.get("/orders/").then(({ data }) => {
      if (active) setOrders(Array.isArray(data) ? data : data.results || []);
    }).catch(() => { if (active) setError("Unable to load orders."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [isLoggedIn]);
  if (!isLoggedIn) return <main className="page"><h1>My orders</h1><p>Please <Link to="/login">sign in</Link> to see your orders.</p></main>;
  return <main className="page">
    <h1>My orders</h1>
    {loading && <p>Loading orders...</p>}
    {error && <p role="alert" className="error-message">{error}</p>}
    {!loading && !error && !orders.length && <p>No orders yet. <Link to="/shop">Start shopping</Link>.</p>}
    <div className="order-list">
      {orders.map((order) => <article className="order-history-card" key={order.id}>
        <div className="order-history-header"><h2>Order #{order.id}</h2><span>{order.status}</span></div>
        <p>{new Date(order.created_at).toLocaleDateString("en-IN")} · ₹{Number(order.total_amount).toLocaleString("en-IN")}</p>
        <ul>{order.items.map((item) => <li key={item.id}>{item.product_name} × {item.quantity}</li>)}</ul>
      </article>)}
    </div>
  </main>;
}
export default Orders;
