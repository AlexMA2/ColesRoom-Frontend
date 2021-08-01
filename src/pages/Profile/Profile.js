import "./Profile.css"
import React from "react";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Profile = () => {
    const [users, setUsers] = useState([])
    // const usuario_id = sessionStorage.getItem("key_user");

    const prueba = {
        Nombre: "Prueba",
        Correo: "Prueba",
        Edad: "Prueba",
        Telefono: "Prueba"
    }

    useEffect(() => {
        setUsers(prueba)
    }, [])



    return (
        <div className="contenedor-principal fondo">
            <h1 className="titulo"> Datos </h1>
            <div className="contenedor-p">
                {
                    <div className="datos">
                        <form>
                            Nombre: {users.name}<br></br>
                            Correo: {users.email}<br></br>
                            Edad: {users.age}<br></br>
                            Telefono: {users.phone}
                        </form>

                    </div>
                }

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