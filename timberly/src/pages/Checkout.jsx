import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const fields = [
  ["full_name", "Full name"], ["email", "Email"], ["phone", "Phone"],
  ["address", "Street address"], ["city", "City"], ["state", "State"],
  ["postal_code", "PIN code"],
];
function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [details, setDetails] = useState({ full_name: "", email: "", phone: "", address: "", city: "", state: "", postal_code: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function placeOrder(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await api.post("/orders/", {
        ...details,
        items: cart.map((item) => ({ product_id: item.id, quantity: item.quantity })),
      });
      setResult(response.data);
      clearCart();
    } catch (err) {
      const message = err.response?.data?.detail || err.response?.data?.items?.[0] ||
        "Unable to place order. Verify your details and stock, then try again.";
      setError(typeof message === "string" ? message : JSON.stringify(message));
    } finally { setSubmitting(false); }
  }

  if (result) return <main className="page confirmation">
    <h1>Order placed!</h1>
    <p>Order #{result.id} was created successfully. Total: ₹{Number(result.total_amount).toLocaleString("en-IN")}.</p>
    <p>This is a demonstration checkout; no online payment has been taken.</p>
    <Link className="primary-button" to="/orders">View your orders</Link>
  </main>;
  if (!isLoggedIn) return <main className="page"><h1>Checkout</h1>
    <p>Please <Link to="/login">sign in</Link> to place an order.</p></main>;
  if (!cart.length) return <main className="page"><h1>Your cart is empty</h1><Link to="/shop">Continue shopping</Link></main>;
  return (
    <main className="page">
      <h1>Checkout</h1><p>Review your details before placing a demo order. No payment will be collected.</p>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h2>Delivery details</h2>
          {fields.map(([key, label]) => <label key={key}>{label}
            <input required value={details[key]} onChange={(event) => setDetails((current) => ({ ...current, [key]: event.target.value }))}
              type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} maxLength={key === "address" ? 255 : 150} />
          </label>)}
          {error && <p role="alert" className="error-message">{error}</p>}
          <button type="submit" className="primary-button" disabled={submitting}>{submitting ? "Placing order..." : "Place demo order"}</button>
        </form>
        <aside className="order-preview">
          <h2>Order summary</h2>
          {cart.map((item) => <p key={item.id}>{item.name} × {item.quantity} <strong>₹{(Number(item.price) * item.quantity).toFixed(2)}</strong></p>)}
          <hr />
          <p><strong>Estimated total</strong><strong>₹{cartTotal.toFixed(2)}</strong></p>
          <small>Final total is verified using current server prices at checkout.</small>
        </aside>
      </div>
    </main>
  );
}
export default Checkout;
