import Footer from './layout/Footer/Footer';
import Header from './layout/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import DetalleProducto from './pages/DetalleProducto/DetalleProducto';
import AdminUsuarios from "./pages/AdminUsuarios/AdminUsuarios.jsx";




export default function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-product" element={<AdminProduct />} />
           <Route path="/detalle/:id" element={<DetalleProducto />} />
           <Route path="/adminusuarios" element={<AdminUsuarios />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}