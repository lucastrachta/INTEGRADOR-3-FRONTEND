import './Header.css';
import logo from "../../assets/logoGato1.png";
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      {/* =============== MAIN HEADER =============== */}
      <header className="main-header">
        <input type="checkbox" className="burger-check" id="burger-check" />
        <label className="burger" htmlFor="burger-check">
          <div className="burger-line" />
        </label>
        <div className="header-left">
          <a href="#">
            <img className="header-logo" src={logo} alt="Brand logo" />
          </a>
          {/* ===============    MAIN NAV    =============== */}
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Principal
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  Contacto
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  Acerca de
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin-product" className="nav-link">
                  Admin Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Registro
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/adminusuarios" className="nav-link">
                  Admin Usuarios
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
       <div className="header-right">
  <i className="fa-solid fa-cart-shopping" />
  <i className="fa-solid fa-user" />
</div>

      </header>
    </>
  );
}