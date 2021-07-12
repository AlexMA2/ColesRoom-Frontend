import React, { Component } from "react";
import '../../utils.css'
import { Form, Button } from 'react-bootstrap';
import "./CreateTask.css"

const CreateTask = () => {

    const CrearTarea = (ev) => {
        alert("TAREA REGISTRADA");
    }



    return (
        <div style={{ "padding": "15px" }}>
            <h1>CREAR TAREA</h1>
            <br></br>
            <Form className="Form">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Nombre de la Tarea</Form.Label>
                    <Form.Control size="lg" type="text" placeholder="Nombre de la Tarea" />
                </Form.Group>
                <br></br>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripcion de la tarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Subir Archivo (Opcional)</Form.Label>
                    <Form.File id="exampleFormControlFile1" />
                </Form.Group>
                <br></br>
                <Form.Group>
                    <p>Seleccione Fecha Limite</p>
                    <div className="contenedor">
                        <div className="center">
                            <input type="datetime-local" />
                        </div>
                    </div>
                </Form.Group>
            </Form>
            <br></br>
            <Button onClick={CrearTarea} className>
                Primary
            </Button>
        </div>
    );
}

export default CreateTask