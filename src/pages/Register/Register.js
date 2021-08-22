import React, { useState } from 'react'

import { Link, Redirect } from 'react-router-dom'
import '../../utils.css'
import "./Register.css"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Register = () => {
  const [logeado, setlogeado] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  const validar = (e) => {
    var email= document.getElementById("email").value.replace(/\s+/g, '')
    var p= document.getElementById("pss").value.replace(/\s+/g, '')
    var nom=  document.getElementById("nombre").value.replace(/\s+/g, '')
    var ap=  document.getElementById("apellido").value.replace(/\s+/g, '')
    if(email==="" || p===""||nom===""||ap===""){
      alert("Rellene todos los campos!!");
    }
  };
  const registration = e => {
    e.preventDefault()
    const form = e.target

    const data = {
      "name": form.name.value,
      "surname": form.surname.value,
      "email": form.email.value,
      "password": form.password.value
    }

    fetch('https://colesroomapp.herokuapp.com/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(d => {
        if (d.id) {
          setlogeado(true);
          sessionStorage.setItem("user", d.id)
          setUser(d.id)
        }
        else {
          openSB()
          setError(d.error)
        }        
        
      }).catch(err => 'Hubo un problema: '.err);

  }


  const [cambio, setcambio] = useState("")
  const handleChangeInput = evento => {
    const { value } = evento.target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)) {
      setcambio(value)
    }
    if (value === "") {
      setcambio("")
    }
  }

  const [cambio2, setcambio2] = useState("")
  const handleChangeInput2 = evento => {
    const { value } = evento.target;
    let regex = new RegExp("^[a-zA-Z ]+$");

    if (regex.test(value)) {
      setcambio2(value)
    }
    if (value === "") {
      setcambio2("")
    }
  }

  const [SBOpen, setSBOpen] = useState(false)

  const openSB = () => {
    setSBOpen(true)
  }

  const closeSB = () => {
    setSBOpen(false)
  }


  return (
    <div className="container-form">
      <div className="ax-form-style1">
     {
       logeado &&
       <Redirect to="/" />
     }
     
      <h2 className="ax-form__title"> Registrate </h2>
     <form className="ax-form__form" id="form" onSubmit={registration}>
       <div className="ax-form__input">
         <p> Nombres: </p>
         <input name="name" id="nombre" type="text" value={cambio} onChange={handleChangeInput} placeholder="Ingrese Nombre Completo" required/>
       </div>
       <div className="ax-form__input">
         <p> Apellidos: </p>
         <input name="surname" id="apellido" type="text" value={cambio2} onChange={handleChangeInput2} placeholder="Ingrese Nombre Completo" required/>
       </div>
       <div className="ax-form__input">
         <p> Correo Electr&oacute;nico: </p>
         <input name="email" id="email"type = "email" placeholder="Introduce tu correo electrónico aquí..." required/>
       </div>
       <div className="ax-form__input">
         <p> Contraseña: </p>
         <input name="password" id="pss" type = "password" placeholder = "Ingrese su Contraseña" required/>
       </div>
       <input type="submit" value="Ingresar" onClick={validar}/>
     </form>
     <div className="ax-form__utils">
       <Link to="/login"> ¿Ya tienes una cuenta? </Link>
     </div>
   </div>
        {
          logeado &&
          <Redirect to="/" />
        }
      <div>
        <h2 className="ax-form__title"> Registrate </h2>
        <form className="ax-form__form" id="form" onSubmit={registration}>
          <div className="ax-form__input">
            <p> Nombres: </p>
            <input name="name" type="text" value={cambio} onChange={handleChangeInput} placeholder="Ingrese Nombre Completo" required />
          </div>
          <div className="ax-form__input">
            <p> Apellidos: </p>
            <input name="surname" type="text" value={cambio2} onChange={handleChangeInput2} placeholder="Ingrese Nombre Completo" required />
          </div>
          <div className="ax-form__input">
            <p> Correo Electr&oacute;nico: </p>
            <input name="email" type="email" placeholder="Introduce tu correo electrónico aquí..." required />
          </div>
          <div className="ax-form__input">
            <p> Contraseña: </p>
            <input name="password" type="password" placeholder="Ingrese su Contraseña" required />
          </div>
          <input type="submit" value="Ingresar" />
        </form>
        <div className="ax-form__utils">
          <Link to="/login"> ¿Ya tienes una cuenta? </Link>
        </div>
      </div>
      <Snackbar open={SBOpen} autoHideDuration={6000} onClose={closeSB}>
        <MuiAlert onClose={closeSB} severity="error" elevation={6} variant="filled">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}


export default Register
