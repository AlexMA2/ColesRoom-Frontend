import "./Profile.css"
import React from "react";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Profile = () => {

    const prueba = {
        Nombre: "Prueba",
        Correo: "Prueba",
        Edad: "Prueba",
        Telefono: "Prueba"
    }

    return (
        <div className="contenedor-principal fondo">
            <h1 className="titulo"> Datos </h1>
            <div className="contenedor-p">
                <div className="datos">
                    <div>{prueba.Nombre}</div>
                    <div>{prueba.Nombre}</div>
                    <div>{prueba.Nombre}</div>
                    <div>{prueba.Nombre}</div>

                </div>
                <div>
                    <Link to="/profile/edit">
                        <div className="button">
                            <Button variant="dark" type="submit">
                                Editar Datos
                            </Button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;