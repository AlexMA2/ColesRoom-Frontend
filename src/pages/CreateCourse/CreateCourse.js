import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import "./CreateCourse.css";
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


    fetch('/api/CreateCourse', {
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
    <div>
      <form className="form_Curso" onSubmit={registrarCurso}>
        <h1>Crear Curso</h1>
        <div>
          <div className="form__item">
            <div>
              <label htmlFor="name">
                Nombre
                <input type="text" name="name" id="name" placeholder="Ingrese nombre del curso" required/>
              </label>
            </div>
            <div>
              <label htmlFor="descripcion">
                Ingrese una descripción
                <input type="text" name="description" id="descripcion" placeholder="Ingrese una descripcion" required/>
              </label>
            </div>
            <div>
              <label htmlFor="categoria">
                Privacidad
              </label>
              <select name="category">
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
              </select>
            </div>
          </div>
          <div className="form_item">
            <input type="submit" value="Crear" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
