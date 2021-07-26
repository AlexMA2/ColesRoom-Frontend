import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {Redirect} from "react-router-dom";
import '../../utils.css'
import "./Register.css"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'

const Register = () => {
  const [logeado, setlogeado] = useState(false)
  const [errorRegister, seterrorRegister] = useState("")
  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  
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
      "name": form.name.value,
      "surname": form.surname.value,
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
      .then(d => {        
        setlogeado(true);          
        sessionStorage.setItem("user", d.id)  
        setUser(d.id)        
      })
      .catch(err => seterrorRegister(errores[err.error] || 'Hubo un problema'));

  }


  const [cambio, setcambio] = useState("")
  const handleChangeInput = evento => {
    const { name, value } = evento.target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)) {
      console.log(name, value);
      setcambio(value)
    }
  }

  const [cambio2, setcambio2] = useState("")
  const handleChangeInput2 = evento => {
    const { name, value } = evento.target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)) {
      console.log(name, value);
      setcambio2(value)
    }
  }


  return (
    <div className="container-form">
      <div className="ax-form-style1">
     {
       logeado &&
       <Redirect to="/" />
     }
     
      <h2 className="ax-form__title"> Registrate </h2>
     <form className="ax-form__form" id="form" onSubmit={registration}>
       <div className="ax-form__input">
         <p> Nombres: </p>
         <input name="name" type="text" value={cambio} onChange={handleChangeInput} placeholder="Ingrese Nombre Completo" required/>
       </div>
       <div className="ax-form__input">
         <p> Apellidos: </p>
         <input name="surname" type="text" value={cambio2} onChange={handleChangeInput2} placeholder="Ingrese Nombre Completo" required/>
       </div>
       <div className="ax-form__input">
         <p> Correo Electr&oacute;nico: </p>
         <input name="email" type = "email" placeholder="Introduce tu correo electrónico aquí..." required/>
       </div>
       <div className="ax-form__input">
         <p> Contraseña: </p>
         <input name="password" type = "password" placeholder = "Ingrese su Contraseña" required/>
       </div>
       <input type="submit" value="Ingresar" />
     </form>
     <div className="ax-form__utils">
       <Link to="/login"> ¿Ya tienes una cuenta? </Link>
     </div>
   </div>
    </div>   
    
  )
}


export default Register
