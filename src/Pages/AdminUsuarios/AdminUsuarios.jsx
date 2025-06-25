import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./AdminUsuarios.css";

const URL = "https://685753ee21f5d3463e54fcf6.mockapi.io/usuarios";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  async function obtenerUsuarios() {
    try {
      const res = await axios.get(URL);
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }

  function editarUsuario(usuario) {
    setEditando(usuario.id);
    setValue("nombre", usuario.nombre);
    setValue("email", usuario.email);
  }

  async function eliminarUsuario(id) {
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
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        obtenerUsuarios();
      } catch {
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  }

  async function onSubmit(data) {
    try {
      if (editando) {
        await axios.put(`${URL}/${editando}`, data);
        Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success");
        setEditando(null);
      } else {
        await axios.post(URL, data);
        Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
      }
      reset();
      obtenerUsuarios();
    } catch {
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
    }
  }

  return (
    <div className="admin-usuarios">
      <h2>{editando ? "Editar Usuario" : "Nuevo Usuario"}</h2>

      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            {...register("nombre", { required: "El nombre es obligatorio", minLength: 3 })}
          />
          {errors.nombre && <p className="error">{errors.nombre.message}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /\S+@\S+\.\S+/, message: "Formato inválido" },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <button type="submit">{editando ? "Actualizar" : "Cargar"}</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td data-label="ID">{u.id}</td>
                <td data-label="Nombre">{u.nombre}</td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Acciones">
                  <button onClick={() => editarUsuario(u)} title="Editar">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => eliminarUsuario(u.id)}
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
