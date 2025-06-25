import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://685753ee21f5d3463e54fcf6.mockapi.io";

export default function DetalleProducto() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/productos/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error al obtener producto:", error));
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: "300px", borderRadius: "10px", marginBottom: "1rem" }}
      />
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Fecha de creación:</strong> {product.createdAt}</p>
    </div>
  );
}
