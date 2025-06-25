import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./AdminProduct.css";

const URL = "https://685753ee21f5d3463e54fcf6.mockapi.io/productos";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get(URL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    reset(product);
  }

  async function deleteProduct(id) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${URL}/${id}`);
        Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
        getProducts();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  }

  async function onSubmit(data) {
    try {
      if (editingProduct) {
        await axios.put(`${URL}/${editingProduct.id}`, data);
        Swal.fire("¡Éxito!", "Producto actualizado correctamente", "success");
        setEditingProduct(null);
      } else {
        await axios.post(URL, data);
        Swal.fire("¡Éxito!", "Producto creado correctamente", "success");
      }
      reset();
      getProducts();
    } catch {
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  }

  return (
    <div className="admin-product">
      <h2>Administrar Productos</h2>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Nombre del producto</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio", minLength: 3 })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="input-group">
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { required: "El precio es obligatorio", min: 0.01 })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>

        <div className="input-group">
          <label>Descripción</label>
          <textarea
            {...register("description", { required: "La descripción es obligatoria", minLength: 10 })}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div className="input-group">
          <label>Imagen (URL)</label>
          <input
            type="url"
            {...register("image", {
              required: "La URL de la imagen es obligatoria",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: "Debe ser una URL válida de imagen",
              },
            })}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

        <div className="input-group">
          <label>Categoría</label>
          <select {...register("category", { required: "Debe seleccionar una categoría" })} defaultValue="">
            <option value="" disabled>
              Seleccionar categoría
            </option>
            <option value="Comida">Comida</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Hogar">Hogar</option>
          </select>
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>

        <button type="submit">{editingProduct ? "Actualizar" : "Cargar"}</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td data-label="ID">{p.id}</td>
                <td data-label="Nombre">{p.name}</td>
                <td data-label="Precio">${Number(p.price).toFixed(2)}</td>
                <td data-label="Descripción">{p.description}</td>
                <td data-label="Imagen">
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                  />
                </td>
                <td data-label="Categoría">{p.category}</td>
                <td data-label="Acciones">
                  <button onClick={() => handleEdit(p)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    title="Eliminar"
                    style={{ marginLeft: 8, color: "red" }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
