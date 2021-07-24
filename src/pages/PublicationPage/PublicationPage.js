import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory, Redirect } from "react-router"
import { Button } from "@material-ui/core"
import "./PublicationPage.css"


const CoursePage = () => {
    const [logeado, setlogeado] = useState(false)
    const [errorRegister, seterrorRegister] = useState("")

    const errores = {
        "auth/email-already-exists": "Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único. ",
        "auth/internal-error": "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. ",
        "auth/invalid-email": "El valor que se proporcionó para la propiedad del usuario email no es válido. ",
        "auth/invalid-password": "El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres. ",
        "auth/name-already-in-use": "Otro usuario ya está utilizando el nombre de usuario proporcionado. Cada usuario debe tener un correo electrónico único. "
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
                console.log(d)
                sessionStorage.setItem("user", d.id)

            })
            .catch(err => seterrorRegister(errores[err.error] || 'Hubo un problema'));

    }

    return (
        <div className="main">
            <div className="title">
                <div className="title-title">
                    Holas
                </div>
                <div className="title-teacher">
                    profesor
                </div>
            </div>
            <div className="content">
                <div className="content-content">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                     It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 
                    'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors 
                    now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
                    Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </div>
                <div className="content-files">
                    <div>AQUI IRAN LOS ARCHIVOS</div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage