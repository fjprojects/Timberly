import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("timberlyCart") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("timberlyCart", JSON.stringify(cart)); }, [cart]);

  function addToCart(product) {
    if (!product?.id || !product.is_available || product.stock <= 0) return;
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id
        ? { ...item, stock: product.stock, price: product.price, quantity: Math.min(item.quantity + 1, product.stock) }
        : item);
      return [...current, { ...product, quantity: 1 }];
    });
  }
  function removeFromCart(id) { setCart((items) => items.filter((item) => item.id !== id)); }
  function increaseQuantity(id) { setCart((items) => items.map((item) => item.id === id
    ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item)); }
  function decreaseQuantity(id) { setCart((items) => items.map((item) => item.id === id
    ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0)); }
  function clearCart() { setCart([]); }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity,
    decreaseQuantity, clearCart, cartCount, cartTotal }}>{children}</CartContext.Provider>;
}
export function useCart() { return useContext(CartContext); }
