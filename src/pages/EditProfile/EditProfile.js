
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import {Redirect} from "react-router-dom";

const EditProfile = () => {
    const [editado, setEditado] = useState(false)
    const [users, setUsers] = useState([])
    const usuario_id = sessionStorage.getItem("key_user");

    useEffect(() => {

    }, [])

    const Actualizar = e => {
        const form = e.target
        const data = {
            "nombre": form.fullname.value,
            "edad": form.age.value,
            "telefono": form.phone.value
          }
        users
            .filter((us) => us.user_id === usuario_id)
            .map((us) => (
                <div>
                    {
                        
                    }
                </div>
            ))
        setEditado(true)
    }
    return (
        <div>
            
            <h1 className="titulo"> Datos </h1>
            <div>
                <Form onSubmit={Actualizar}>
                {
                     editado &&
                    <Redirect to="/profile" />
                }
                    <div className="groups">
                        <Form.Group controlId="EditProfile -name">
                            <Form.Label>Nombre </Form.Label>
                            <Form.Control name="fullname" type="name" placeholder="Actualice su nombre" required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="EditProfile -phone">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control name="phone" type="phone" placeholder="Actualice su telefono" required></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="EditProfile -age">
                            <Form.Label>Edad</Form.Label>
                            <Form.Control name="age" type="age" placeholder="Actualice su edad" required></Form.Control>
                        </Form.Group>
                    </div>
                    <Button variant="dark" type="submit">
                        Actualizar
                    </Button>
                </Form>

            </div>
            <div>

            </div>
        </div>
    );
};

export default EditProfile;