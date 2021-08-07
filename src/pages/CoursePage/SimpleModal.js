import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "../../utils.css"
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
    var course_id=''
  const classes = useStyles();
 
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    
    setOpen(true);
  };
  const addStudent = (ev) => {
    let Doc= document.getElementById("email").value;
    console.log(Doc)
    var URLactual = window.location.href;
    course_id = URLactual.substring(34)
    const data = {
        Email: Doc,
        courseID: desicion
    }
    console.log(course_id)
    console.log(data.Email);
    fetch('https://colesroomapp.herokuapp.com/api/add', {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => console.log(res.status)
        
        )
        .catch(err => 'Hubo un problema');
    
};


  const handleClose = (e) => {
    addStudent(e);
    setOpen(false);
    const id_curso=desicion
    console.log("este es el codigo de curso");
    console.log(id_curso);
    console.log("Registrar Alumno");
    
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Inscribir Alumno</h2>
      <form className="Form" id="form" onSubmit={handleClose}>
       
       <div className="ax-form__input">
         <p> Correo Electr&oacute;nico: </p>
         <input name="email" id="email" type ="email" placeholder="Introduce tu correo electrónico aquí..." required/>         
       </div>
       <button type="submit">Inscribir</button>
     </form>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary" type="button" onClick={handleClose}>Inscribir</button>
    </div>
  );

  return (
    <div>
      <button className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary" type="button" onClick={handleOpen} >
        Inscribir alumno
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
