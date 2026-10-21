import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>

        <Link to="/shop" className="continue-shopping">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h2>{item.name}</h2>

                <p>₹{Number(item.price).toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: ₹
                  {(
                    Number(item.price) * item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <p>
            Total: <strong>₹{cartTotal.toFixed(2)}</strong>
          </p>

          <Link to="/checkout" className="checkout-button">
            Proceed to demo checkout
          </Link>

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;