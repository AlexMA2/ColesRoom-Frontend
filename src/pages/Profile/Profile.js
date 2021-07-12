import "./Profile.css"
import React from "react";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'

const Profile = () => {
    const [users, setUsers] = useState([])
    // const usuario_id = sessionStorage.getItem("key_user");


    useEffect(() => {

    }, [])



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
                    <a href="/editprofile">
                        <div className="button">
                            <Button variant="dark" type="submit">
                                Editar Datos
                            </Button>
                        </div>
                    </a>
                </div>




            </div>
        </div>
    );
};

export default Profile;