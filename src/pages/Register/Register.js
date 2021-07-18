import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {Redirect} from "react-router-dom";
import '../../utils.css'
import { Form, Button } from 'react-bootstrap';
import "./Register.css"
const Register = () => {
  const [logeado, setlogeado] = useState(false)
  const [errorRegister, seterrorRegister] = useState("")
  
  const errores = {
    "auth/email-already-exists" : "Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único. ",
    "auth/internal-error" : "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. ",
    "auth/invalid-email" : "El valor que se proporcionó para la propiedad del usuario email no es válido. ",
    "auth/invalid-password" : "El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres. ",
    "auth/name-already-in-use" : "Otro usuario ya está utilizando el nombre de usuario proporcionado. Cada usuario debe tener un correo electrónico único. "
  }

  const registration = e => {
    e.preventDefault()
    const form = e.target

    const data = {      
      "name": form.fullname.value,
      "email": form.email.value,
      "password": form.password.value
    }

    fetch('/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {        
        setlogeado(true);        
      })
      .catch(err => seterrorRegister(errores[err.error] || 'Hubo un problema'));

  }


  return (
    <div class="ax-form-style1">
     {
       logeado &&
       <Redirect to="/" />
     }
     <h2 class="ax-form__title"> Registrate </h2>
     <form class="ax-form__form" id="form">
       <div class="ax-form__input">
         <p> Nombre Completo: </p>
         <input name="fullname" type="name" placeholder="Ingrese Nombre Completo" required/>
       </div>
       <div class="ax-form__input">
         <p> Correo Electr&oacute;nico: </p>
         <input name="email" type = "email" placeholder="Introduce tu correo electrónico aquí..." required/>
       </div>
       <div class="ax-form__input">
         <p> Contraseña: </p>
         <input name="password" type = "password" placeholder = "Ingrese su Contraseña" required/>
       </div>
       <input type="submit" value="Ingresar" />
     </form>
     <div class="ax-form__utils">
       <Link to="#"> ¿Necesitas ayuda? </Link>
       <Link to="#"> ¿Ya tienes una cuenta? </Link>
     </div>
   </div>
  )
}


export default Register
