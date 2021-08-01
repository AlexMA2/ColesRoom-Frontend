import "./Profile.css"
import React from "react";
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Profile = () => {
    const [users, setUsers] = useState([])
    // const usuario_id = sessionStorage.getItem("key_user");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const prueba = {
        Nombre: "Prueba",
        Correo: "Prueba",
        Edad: "Prueba",
        Telefono: "Prueba"
    }

useEffect(() => {
    setUsers(prueba)
}, [prueba])



return (
    <div className="contenedor-principal fondo">
        <h1 className="titulo"> Datos </h1>
        <div className="contenedor-p">
            {
                users
                    //.filter((us) => us.user_id === usuario_id)
                    .map((us) => (
                        <div className="datos">
                            <form>
                                Nombre: {us.name}<br></br>
                                Correo: {us.email}<br></br>
                                Edad: {us.age}<br></br>
                                Telefono: {us.phone}
                            </form>

                        </div>
                    ))
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