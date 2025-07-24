import { useEffect, useState } from "react";
import axios from "axios";
import './AdminProduct.css';


export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:3000/products";

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/${editingId}`, formData, );
      setEditingId(null);
    } else {
      await axios.post(API, formData , 
        { headers: { Authorization: token } }
      );
    }
    setFormData({ name: "", price: "", description: "" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProducts();
  };








  


 axios.post({headers: {Authorization: token}})

  return (
    <div className="container">
      <h2>Administrar Productos</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <h3>Lista de productos</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod._id}>
            <strong>{prod.name}</strong> - ${prod.price}<br />
            {prod.description}<br />
            <button onClick={() => handleEdit(prod)}>Editar</button>
            <button onClick={() => handleDelete(prod._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
