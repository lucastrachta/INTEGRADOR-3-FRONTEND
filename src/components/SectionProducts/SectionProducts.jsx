import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SectionProducts.css";


const URL = "https://685753ee21f5d3463e54fcf6.mockapi.io";

export default function SectionProducts() {





const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL}/productos`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);


 return (
   
  <div className="cards-container">
      {products.map(product => (
        <div className="card" key={product.id}>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <button onClick={() => navigate(`/detalle/${product.id}`)}>Ver detalle</button>
        </div>
      ))}
    </div>

  );
}
