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
    "auth/wrong-password" : "La contraseña introducida es incorrecta",
    "auth/internal-error" : "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. ",
    "auth/user-not-found" : "No existe ningún registro de usuario que corresponda al identificador proporcionado."
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
    <div className="login container-fluid">
      {
        logeado &&
            <Redirect to="/"/>
      }
      <div className="login-box">
        <h1 className="login-title">Iniciar sesión</h1>
        <Form onSubmit={authentication}>
          <div className="groups">
            <Form.Group controlId="login-email">
              <Form.Label>Email</Form.Label>
                <Form.Control autoComplete="off" name="email" type="email" placeholder="Ingrese su email" required/>
            </Form.Group>
            <Form.Group controlId="login-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control name="password" type="password" placeholder="Ingrese su contraseña" required/>
            </Form.Group>
          </div>
          <Button variant="dark" type="submit">
            Ingresar
          </Button>
          <Form.Text className="text-muted">
            ¿No tienes cuenta de usuario?
            <Link to="/register"> Registrate </Link>
          </Form.Text>
          <div>
            <p> {errorLogin}</p>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login