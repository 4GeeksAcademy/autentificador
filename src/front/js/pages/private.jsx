import React, { useActionState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Private = () => {
const {store, actions} = useContext(Context);
const navigate = useNavigate()

useEffect(()=>{
    if (!localStorage.getItem('token')) navigate('/') /*(Primer paso)Esto le dice al código que si no tenemos un token en el local storage no nos va a llevar a private. Si hacemos /private en el browser no bota de ahí */
    if (!actions.checkUser()) { /*Si el usuario me devuelve falso significa que el token no esta bien (si esta bien encuentra el usuario del token) */
        localStorage.removeItem('token') /*Por tanto elimino el token que tenga */
        navigate('/') /*Y lo mandamos a que se registre*/
    }
}, [])

const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
}


return(

    <div>
        <h2>Vista privada</h2>
        <p>Bienvenido: {store.user?.email}</p>
        <button onClick={handleLogout}>logout</button>
    </div>

)


}