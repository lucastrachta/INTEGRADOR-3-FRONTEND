
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import './AdminUsuarios.css';


function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idUsuarioEditando, setIdUsuarioEditando] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Obtener usuarios al cargar
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setUsuarios(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = async (data) => {
    if (modoEdicion) {
      // Modo editar
      try {
    await axios.put(
          `http://localhost:3000/users/${idUsuarioEditando}`,
          data
        );
        alert("Usuario actualizado");
        actualizarLista();
        reset();
        setModoEdicion(false);
        setIdUsuarioEditando(null);
      } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar");
      }
    } else {
      // Modo crear
      try {
        await axios.post("http://localhost:3000/users", data);
        alert("Usuario creado");
        actualizarLista();
        reset();
      } catch (error) {
        console.error("Error al crear:", error);
        alert("Error al crear");
      }
    }
  };

  const actualizarLista = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsuarios(res.data.users))
      .catch((err) => console.log(err));
  };

  const editarUsuario = (usuario) => {
    setModoEdicion(true);
    setIdUsuarioEditando(usuario._id);
    setValue("name", usuario.name);
    setValue("email", usuario.email);
    setValue("password", "");
    setValue("role", usuario.role);
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        alert("Usuario eliminado");
        actualizarLista();
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="container">
      <h2>{modoEdicion ? "Editar Usuario" : "Crear Usuario"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombre"
          {...register("name", {
            required: "El nombre es obligatorio",
            minLength: 3,
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: 4,
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <select {...register("role", { required: "El rol es obligatorio" })}>
          <option value="">Selecciona un rol</option>
          <option value="client">Cliente</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}

        <button type="submit">
          {modoEdicion ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>

      <hr />

      <h3>Lista de Usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>
                <button onClick={() => editarUsuario(usuario)}>Editar</button>
                <button onClick={() => eliminarUsuario(usuario._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsuarios;

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import "./AdminUsuarios.css";

// const URL = "http://localhost:3000/users";

// export default function AdminUsuarios() {
//   const [usuarios, setUsuarios] = useState([]);
//   const [editando, setEditando] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     obtenerUsuarios();
//   }, []);

//   async function obtenerUsuarios() {
//     try {
//       const res = await axios.get(URL);
//       setUsuarios(res.data.users);
//     } catch (error) {
//       console.error("Error al obtener usuarios:", error);
//     }
//   }

//   function editarUsuario(usuario) {
//     setEditando(usuario._id);
//     setValue("nombre", usuario.nombre);
//     setValue("email", usuario.email);
//   }

//   async function eliminarUsuario(id) {
//     const result = await Swal.fire({
//       title: "¿Estás seguro?",
//       text: "Esta acción no se puede deshacer",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Sí, eliminar",
//       cancelButtonText: "Cancelar",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${URL}/${id}`);
//         Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
//         obtenerUsuarios();
//       } catch {
//         Swal.fire("Error", "No se pudo eliminar el usuario", "error");
//       }
//     }
//   }

//   async function onSubmit(data) {
//     try {
//       if (editando) {
//         await axios.put(`${URL}/${editando}`, data);
//         Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success");
//         setEditando(null);
//       } else {
//         await axios.post(URL, data);
//         Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
//       }
//       reset();
//       obtenerUsuarios();
//     } catch {
//       Swal.fire("Error", "No se pudo guardar el usuario", "error");
//     }
//   }

//   return (
//     <div className="admin-usuarios">
//       <h2>{editando ? "Editar Usuario" : "Nuevo Usuario"}</h2>

//       <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
//         <div className="input-group">
//           <label>Nombre</label>
//           <input
//             type="text"
//             {...register("nombre", { required: "El nombre es obligatorio", minLength: 3 })}
//           />
//           {errors.nombre && <p className="error">{errors.nombre.message}</p>}
//         </div>

//         <div className="input-group">
//           <label>Email</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: "El email es obligatorio",
//               pattern: { value: /\S+@\S+\.\S+/, message: "Formato inválido" },
//             })}
//           />
//           {errors.email && <p className="error">{errors.email.message}</p>}
//         </div>

//         <button type="submit">{editando ? "Actualizar" : "Cargar"}</button>
//       </form>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Nombre</th>
//               <th>Email</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {usuarios.map((u) => (
//               <tr key={u._id}>
//                 <td data-label="ID">{u._id}</td>
//                 <td data-label="Nombre">{u.nombre}</td>
//                 <td data-label="Email">{u.email}</td>
//                 <td data-label="Acciones">
//                   <button onClick={() => editarUsuario(u)} title="Editar">
//                     <FontAwesomeIcon icon={faEdit} />
//                   </button>
//                   <button
//                     onClick={() => eliminarUsuario(u._id)}
//                     title="Eliminar"
//                     style={{ marginLeft: 8, color: "red" }}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
