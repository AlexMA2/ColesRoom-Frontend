import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import "./CreateCourse.css";
import backgroundImage1 from '../../imgs/CourseBackground1.jpg'
import backgroundImage2 from '../../imgs/CourseBackground2.jpg'
import backgroundImage3 from '../../imgs/CourseBackground3.jpg'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
const CreateCourse = (props) => {

  let history = useHistory()

  const registrarCurso = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      category: form.category.value,
      description: form.description.value,
      image: form.image.value
    };

    if(data.category==="privado"){
      data.category=false
    }else{
      data.category=true
    }

    data.user_id = sessionStorage.getItem("user")
  
    await fetch('https://colesroomapp.herokuapp.com/api/CreateCourse', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then()
      .catch(err => alert("Fallo al Registrar"));

    history.push("/");
  };

  const [value, setValue] = React.useState('privado');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [value2, setValue2] = React.useState('f1');

  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };

  return (
    <div className="main-content">
      <Form className="Container-Form" onSubmit={registrarCurso}>
      <div className="content-title">
        <Form.Label className="content-title-text">CREAR CURSO</Form.Label>
      </div>
      <Form.Group className="mb-2" controlId="formNameCourse">
        <Form.Label className="content-text">Nombre del curso</Form.Label>
        <Form.Control type="text" name="name" placeholder="El nombre siempre es lo m&aacute;s importante..." class="content-text-label" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDescriptionCourse" >
        <Form.Label className="content-text" >Descripci&oacute;n del curso</Form.Label>
        <InputGroup>
          <FormControl type="text" name="description" as="textarea"
            placeholder="Este curso mecece una bonita descripci&oacute;n..." rows="3" style={{ resize: "none" }} />
        </InputGroup>
      </Form.Group>
      <Form.Label className="content-text">Categor&iacute;a del curso</Form.Label>
      <RadioGroup row aria-label="category" name="category" className="radio-group-content mb-3" value={value} onChange={handleChange}>
        <FormControlLabel value="privado" control={<Radio color="primary" />} label="Quiero un curso privado" />
        <FormControlLabel value="publico" control={<Radio color="primary" />} label="Quiero un curso p&uacute;blico" />
      </RadioGroup>
      <Form.Label className="content-text">Elija el fondo que m&aacute;s le guste...</Form.Label>
      <Container>
        <Row >
          <Col xs={6} md={4}>
            <Image src={backgroundImage1} rounded style={{ width: "100%", height: "50px" }} />
          </Col>
          <Col xs={6} md={4}>
            <Image src={backgroundImage2} rounded style={{ width: "100%", height: "50px" }} />
          </Col>
          <Col xs={6} md={4}>
            <Image src={backgroundImage3} rounded style={{ width: "100%", height: "50px" }} />
          </Col>
        </Row>
        <RadioGroup row aria-label="category" name="image" className="radio-group-content mb-3" value={value2} onChange={handleChange2}>
        <Row >
          <Col xs={6} md={4}>
          <FormControlLabel value="f1" style={{ width: "183.5px" }} control={<Radio color="primary"  />} label="Fondo Nº 1" />
          </Col>
          <Col xs={6} md={4}>
          <FormControlLabel value="f2" style={{ width: "183.5px"}} control={<Radio color="primary"/>} label="Fondo Nº 2" />
          </Col>
          <Col xs={6} md={4}>
          <FormControlLabel value="f3" style={{ width: "183.5px"}} control={<Radio color="primary"/>} label="Fondo Nº 3"/>
          </Col>
        </Row>
        </RadioGroup>
      </Container>
      <div className="content-title mt-3">
        <Button variant="success" type="submit" style={{ width: "20%", margin: "0 auto 0" }} >
          Crear Curso
        </Button>
      </div>
    </Form>
    </div>
    
  );
};

export default CreateCourse;