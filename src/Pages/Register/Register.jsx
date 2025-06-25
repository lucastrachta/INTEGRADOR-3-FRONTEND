
import "./Register.css";



export default function Register() {
  return (
    <div>

      




<>
  <h1>REGISTRO</h1>
  <form className="formulario">
    <div className="input-group">
      <label htmlFor="nombresito">Nombre</label>
      <input
        type="text"
        name="nombre"
        id="nombresito"
        required=""
        minLength={3}
        maxLength={14}
        placeholder=""
        autoFocus=""
        autoComplete=""
      />
    </div>
    <div className="input-group">
      <label htmlFor="correo">Correo Electronico</label>
      <input
        type="email"
        name="correo"
        id="correo"
        autoComplete="off"
        required=""
        minLength={3}
        maxLength={14}
      />
    </div>
   <div className="input-group">
  <label htmlFor="contraseña1">Contraseña</label>
  <input
    type="password"
    name="pass1"
    id="contraseña1"
    autoComplete="off"
    required
    minLength={8}
    maxLength={100}
  />
</div>

<div className="input-group">
  <label htmlFor="contraseña2">Repetir Contraseña</label>
  <input
    type="password"
    name="pass2"
    id="contraseña2"
    required
    minLength={8}
    maxLength={100}
  />
</div>

    <div className="input-group">
      <label htmlFor="">fecha de nacimiento</label>
      <input type="date" required="" />
    </div>
    <div className="input-group">
      <label htmlFor="">provincia o pais</label>
      <input type="text" required="" />
    </div>
    <div className="input-group">
      <label htmlFor="comentario">Observaciones</label>
      <textarea
        name="comment"
        id="comentario"
        cols={30}
        rows={10}
        defaultValue={""}
      />
    </div>
    <button type="submit">ENVIAR</button>
    <div className="input-group"></div>
  </form>
</>



    </div>
  );
}
