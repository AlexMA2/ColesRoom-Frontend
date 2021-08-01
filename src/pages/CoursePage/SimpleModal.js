import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


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
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    //const [course, setCourse] = useState({})
    setOpen(true);
  };

  const addStudent = (e) => {
    e.preventDefault();
    const form = e.target;
    var URLactual = window.location.href;
    course_id = URLactual.substring(34)
    const data = {
        Email: form.email.value,
        courseID: course_id
    }
    console.log(course_id)
    console.log(data.Email);
    fetch('/api/add', {

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
    const id_curso=course_id
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
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
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
