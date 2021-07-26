import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import {Form} from "react-bootstrap"
import {Button} from "react-bootstrap"
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import "./CreateCourse.css"

const CreateCourse = (props) => {

  let history = useHistory();
  const [creado, setcreado] = useState(false)
  const [errorCourse, seterrorCourse] = useState("")

  const errores = {
    "auth/internal-error": "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. ",
  }

  const registrarCurso = (e) => {

    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      category: true,
      description: form.description.value,
      //students: form.students.value,
      //date: form.date.value,
      //image: form.image.value,
    };

    data.user_id = sessionStorage.getItem("user")
    if (form.category.value !== "publico") {
      data.category = false
    }


    fetch('/CreateCourse', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(d => {
        setcreado(true);
      })
      .catch(err => seterrorCourse(errores[err.error] || 'Hubo un problema'));

    history.push("/");
  };

  return (
    <div className="container-register">
      <h1 className="title-h2">Crear Curso</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
     
    </div>
  );
};

export default CreateCourse;

//  <form className="form_Curso" onSubmit={registrarCurso}>
//         <h1>Crear Curso</h1>
//         <div>
//           <div className="form__item">
//             <div>
//               <label htmlFor="name">
//                 Nombre
//                 <input type="text" name="name" id="name" placeholder="Ingrese nombre del curso" required/>
//               </label>
//             </div>
//             <div>
//               <label htmlFor="descripcion">
//                 Ingrese una descripción
//                 <input type="text" name="description" id="descripcion" placeholder="Ingrese una descripcion" required/>
//               </label>
//             </div>
//             <div>
//               <label htmlFor="categoria">
//                 Privacidad
//               </label>
//               <select name="category">
//                 <option value="publico">Público</option>
//                 <option value="privado">Privado</option>
//               </select>
//             </div>
//           </div>
//           <div className="form_item">
//             <input type="submit" value="Crear" />
//           </div>
//         </div>
//       </form>