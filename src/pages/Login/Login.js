import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import "./Login.css"

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Login = () => {

  const [logeado, setlogeado] = useState(false)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)

  const authentication = e => {
    e.preventDefault()
    const form = e.target
    setloading(true)
    const data = {
      "email": form.email.value,
      "password": form.password.value
    }

    fetch('https://colesroomapp.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(d => {
        setloading(false)
        if (d.id) {
          setlogeado(true);
          sessionStorage.setItem("user", d.id)
          setUser(d.id)      
             
        }
        else {
          seterror(d.error)
          openSB()
        }
      })

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
        <h2 className="ax-form__title"> Inicia Sesi&oacute;n</h2>
        <form className="ax-form__form" onSubmit={authentication}>
          <div className="ax-form__input">
            <p> Correo Electr&oacute;nico: </p>
            <input type="text" name="email" placeholder="Introduce tu correo electrónico aquí..." />
          </div>
          <div className="ax-form__input">
            <p> Contraseña: </p>
            <input type="password" name="password" placeholder="Introduce tu contraseña aquí..." />
          </div>
          {
            loading 
            ?
            <CircularProgress/>       
            :  
            <input type="submit" value="Ingresar"/>
          }
          
        </form>
        <div className="ax-form__utils">
          <Link to="/register"> ¿No tienes una cuenta? </Link>
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

export default Login