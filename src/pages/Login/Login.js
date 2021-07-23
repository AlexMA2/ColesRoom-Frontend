import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  Redirect
} from "react-router-dom";

import "./Login.css"

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'

const Login = () => {

  const [logeado, setlogeado] = useState(false)
  const [errorLogin, seterrorLogin] = useState('')

  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)

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
      .then(d => {
        setlogeado(true);
        sessionStorage.setItem("user", d.id)
        setUser(d.id)
      })
      .catch(err => seterrorLogin(errores[err.error] || 'Hubo un problema'));

  }

  return (
    <div className="container-form">
      <div className="ax-form-style1">

        {
          logeado &&
          <Redirect to="/" />
        }
        <h2 className="ax-form__title"> Inicia Sesi&oacute;n</h2>
        <form className="ax-form__form" onSubmit={authentication}>
          <div className="ax-form__input">
            <p> Correo Electr&oacute;nico: </p>
            <input type="text" name="email" placeholder="Introduce tu correo electrónico aquí..." />
          </div>
          <div className="ax-form__input">
            <p> Contraseña: </p>
            <input type="password" name="password" placeholder="Introduce tu contraseña aquí..." />
          </div>
          <input type="submit" value="Ingresar" />
        </form>
        <div className="ax-form__utils">
          <Link to="#"> ¿Olvidaste tu contraseña? </Link>
          <Link to="#"> ¿No tienes una cuenta? </Link>
        </div>
      </div>
    </div>


  )
}

export default Login