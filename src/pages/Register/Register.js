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
    <div className="ed-grid margen">
      {
        logeado &&
        <Redirect to="/" />
      }
      <div className="register-box">
        <h1 className='register-title'>Registrate</h1>
        <Form onSubmit = {registration}>
          <div className="groups">
            <Form.Group controlId="register-name">
              <Form.Label>Nombre Completo</Form.Label>
                <Form.Control name="fullname" type="name" placeholder="Ingrese Nombre Completo" required></Form.Control>
            </Form.Group>
            <Form.Group controlId ="register-email">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type = "email" placeholder="Ingrese su Email" required></Form.Control>
            </Form.Group>
            <Form.Group controlId = "register-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control name="password" type = "password" placeholder = "Ingrese su Contraseña" required></Form.Control>
            </Form.Group>
          </div>
          <Button variant = "dark" type="submit">
            Registrarse
          </Button>
          <Form.Text className="text-muted">
            ¿Ya tienes cuenta de usuario?
            <Link to="/login"> Iniciar Sesion </Link>
          </Form.Text>
          <div>
            <p> {errorRegister}</p>
          </div>
        </Form>
      </div>
    </div>
  )
}


export default Register
