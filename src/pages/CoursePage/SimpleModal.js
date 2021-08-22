import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "../../utils.css"

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SortByAlpha } from '@material-ui/icons';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

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
  const validaremail = (e) => {
    var nom=  document.getElementById("email").value.replace(/\s+/g, '')
    if(nom===""){
      alert("Digite un email válido!!");
    }
  };
  var desicion = ''
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [snackbar, setSnackbar] = useState({ type: 'success', message: '', open: false })

    const openSB = (type, message) => {
        setSnackbar({ type, message, open: true })        
    }

    const closeSB = () => {
        setSnackbar({ ...snackbar, open: false })       
    }

  const handleOpen = () => {
    //const [course, setCourse] = useState({})
    setOpen(true);
  };
  const addStudent = () => {
    let Doc = document.getElementById("email").value;
    
    var URLactual = window.location.href;
    desicion = URLactual.substring(34)
    const data = {
      Email: Doc,
      courseID: desicion,
      teacherID: sessionStorage.getItem('user')
    }
    
    fetch('https://colesroomapp.herokuapp.com/api/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {     
        console.log(res)           
        if (res.status === "OK") {
          openSB("success", `"Estudiante ${data.Email} añadido"`)
          setOpen(false)
        }
        else {
          openSB("error", `${res.error} . \nCorreo Electrónico introducido : ${data.Email} `)
        }
      })
      .catch(err => openSB("error", err));

  };


  const handleClose = (e) => {
    validaremail()
    addStudent();
    const id_curso = desicion
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Inscribir Alumno</h2>
      <form className="ax-form__form" id="form">

        <div className="ax-form__input">
          <p> Correo Electr&oacute;nico: </p>
          <input name="email" id="email" type="email" placeholder="Introduce tu correo electrónico aquí..." required
          />
        </div>

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
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSB} >
        <MuiAlert onClose={closeSB} severity={snackbar.type} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
