import "./Navbar.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { isLoggedIn, username, logout } = useAuth();
  const items = [["/", "Home"], ["/shop", "Shop"], ["/categories", "Categories"],
    ["/about", "About"], ["/contact", "Contact"], ["/cart", `Cart (${cartCount})`]];
  if (isLoggedIn) items.splice(5, 0, ["/orders", "My orders"]);
  return <nav className="navbar" aria-label="Main navigation">
    <Link className="logo" to="/">Timberly</Link>
    <button type="button" className="menu-icon" aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
    <ul className={menuOpen ? "nav-links active" : "nav-links"}>
      {items.map(([to, label]) => <li key={to}>
        <NavLink to={to} end={to === "/"} className={({ isActive }) => isActive ? "active-link" : ""}
          onClick={() => setMenuOpen(false)}>{label}</NavLink>
      </li>)}
      {isLoggedIn ? <><li className="nav-greeting">Hi, {username}</li>
        <li><button type="button" className="nav-button" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button></li></> :
        <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>}
    </ul>
  </nav>;
}
export default Navbar;
