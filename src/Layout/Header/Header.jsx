


















import './Header.css';
import logo from "../../assets/logoGato1.png";
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/login"); // o "/" si preferís volver a la página principal
  }

  return (
    <>
      <header className="main-header">
        <input type="checkbox" className="burger-check" id="burger-check" />
        <label className="burger" htmlFor="burger-check">
          <div className="burger-line" />
        </label>

        <div className="header-left">
          <a href="#">
            <img className="header-logo" src={logo} alt="Brand logo" />
          </a>

          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Principal</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">Contacto</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">Acerca de</NavLink>
              </li>

              {user?.role === "admin" && (
                <>
                  <li className="nav-item">
                    <NavLink to="/admin-product" className="nav-link">
                      Admin Productos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/adminusuarios" className="nav-link">
                      Admin Usuarios
                    </NavLink>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Registro</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <div className="header-right">
          {user ? (
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-link">Login</NavLink>
          )}

          <i className="fa-solid fa-cart-shopping" />
          <i className="fa-solid fa-user" />
        </div>
      </header>
    </>
  );
}








// 2222222222222222222222222222222

// import './Header.css';
// import logo from "../../assets/logoGato1.png";
// import { NavLink } from 'react-router-dom';

// export default function Header() {


// const user =  JSON.parse(localStorage.getItem("User"));

// function handleLogout() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("User");
//   window.location.href = "/login"; // o "/"
// }
// console.log("User logueado:", user);

//   return (
//     <>
//       {/* =============== MAIN HEADER =============== */}
//       <header className="main-header">
//         <input type="checkbox" className="burger-check" id="burger-check" />
//         <label className="burger" htmlFor="burger-check">
//           <div className="burger-line" />
//         </label>
//         <div className="header-left">
//           <a href="#">
//             <img className="header-logo" src={logo} alt="Brand logo" />
//           </a>
//           {/* ===============    MAIN NAV    =============== */}
//           <nav className="main-nav">
//             <ul className="nav-list">
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link">
//                   Principal
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/contact" className="nav-link">
//                   Contacto
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/about" className="nav-link">
//                   Acerca de
//                 </NavLink>
//               </li>


//               {user?.role === "admin" && (            
//               <li className="nav-item">
//                 <NavLink to="/admin-product" className="nav-link">
//                   Admin Productos
//                 </NavLink>
//               </li>
//                 )  }


//               <li className="nav-item">
//                 <NavLink to="/register" className="nav-link">
//                   Registro
//                 </NavLink>
//               </li>


// {user?.role === "admin" && (
//   <li className="nav-item">
//     <NavLink to="/adminusuarios" className="nav-link">
//       Admin Usuarios
//     </NavLink>
//   </li>
// )}



//                <li className="nav-item">
//                 <NavLink to="/login" className="nav-link">Login</NavLink>
//             </li>
//             </ul>
//           </nav>
//         </div>
//        <div className="header-right">

       
       
       
//        {user ? (
//   <button className="nav-link" onClick={handleLogout}>
//     Logout
//   </button>
// ) : (
//   <NavLink to="/login" className="nav-link">Login</NavLink>
// )}

       
       
// {/*        
//        {user ? (
//         <a className="nav-link">Logout</a>
//        ) : (<NavLink to="login" className="nav-link">Login</NavLink>
//        )} */}
       
      
      
      

//   <i className="fa-solid fa-cart-shopping" />
//   <i className="fa-solid fa-user" />
// </div>

//       </header>
//     </>
//   );
// }