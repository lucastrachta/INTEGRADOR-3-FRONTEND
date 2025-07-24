import axios from "axios";
import React from "react";
import {useForm} from "react-hook-form";

import Header from "../../layout/header/Header";

const API_URL = "http://localhost:3000"

export default function Login() {
    const {register,handleSubmit } = useForm();

    async function login(data) {
        console.log("Datos recibidos en login:", data);
try{
    console.log("Enviando login a:", `${API_URL}/login`, data)
 const response = await axios.post(`${API_URL}/login`,data)
 console.log("Respuesta del backend:", response.data);
 alert("inicio de sesión exitoso");





//aqui entre parentesis va response.data.user
localStorage.setItem("User",JSON.stringify(response.data.user));

//esto guarda el token del usuario en el localstorage cada vez que logueamos
//antes de data.token ponemos response asi response.data.token porque asi escribimos en el codigo
localStorage.setItem("token" , response.data.token)


}
catch (error) {
    console.log(error)
      console.log("Error en login:", error.response || error.message);
    alert("Error al iniciar sesión");
}
}

return (
    <div style= {{  padding: "20px"                     }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(login)}>
<p>
    <input type="email" {...register("email")} />
</p>
<p>
    <input type="password" {...register("password")} />
</p>
    <button className="btn" type="submit">
    Login
    </button>

        </form>

 </div>)}
console.log("API_URL:", API_URL);
