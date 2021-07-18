import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  Redirect
} from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import "./Login.css"
const Login = () => {

  const [logeado, setlogeado] = useState(false)
  const [errorLogin, seterrorLogin] = useState('')

  const errores = {
    "auth/wrong-password": "La contraseña introducida es incorrecta",
    "auth/internal-error": "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. ",
    "auth/user-not-found": "No existe ningún registro de usuario que corresponda al identificador proporcionado."
  }

  const authentication = e => {
    e.preventDefault()
    const form = e.target

    const data = {
      "email": form.email.value,
      "password": form.password.value
    }

    fetch('/login', {
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
      .catch(err => seterrorLogin(errores[err.error] || 'Hubo un problema'));

  }

  return (
    <div class="ax-form-style1">
      {
        logeado &&
        <Redirect to="/" />
      }
      <h2 class="ax-form__title"> Inicia Sesi&oacute;n</h2>
      <form class="ax-form__form" id="form">
        <div class="ax-form__input">
          <p> Correo Electr&oacute;nico: </p>
          <input type="text" placeholder="Introduce tu correo electrónico aquí..." />
        </div>
        <div class="ax-form__input">
          <p> Contraseña: </p>
          <input type="text" placeholder="Introduce tu contraseña aquí..." />
        </div>
        <input type="submit" value="Ingresar" />
      </form>
      <div class="ax-form__utils">
        <Link to="#"> ¿Olvidaste tu contraseña? </Link>
        <Link to="#"> ¿No tienes una cuenta? </Link>
      </div>
    </div>

  )
}

export default Login