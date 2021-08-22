import React, { useState } from 'react'

import { Link, Redirect } from 'react-router-dom'


import "./Login.css"

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'
import { LocalConvenienceStoreOutlined } from '@material-ui/icons'

const Login = () => {

  const [logeado, setlogeado] = useState(false)

  const dispatch = useDispatch()
  const { setUser } = bindActionCreators(actionCreators, dispatch)
  
  const validar = (e) => {
    var email= document.getElementById("email").value.replace(/\s+/g, '')
    var p= document.getElementById("pss").value.replace(/\s+/g, '')
    if(email==="" || p===""){
      alert("Rellene los campos adecuadamente");
    }
  };
  const authentication = e => {
    e.preventDefault()
    const form = e.target

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
        if (d.id) {
          setlogeado(true);
          sessionStorage.setItem("user", d.id)
          setUser(d.id)
        }
      })

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
            <input type="text"id="email"   name="email" placeholder="Introduce tu correo electrónico aquí..." required/>
          </div>
          <div className="ax-form__input">
            <p> Contraseña: </p>
            <input type="password" id="pss"name="password" placeholder="Introduce tu contraseña aquí..." required />
          </div>
          <input type="submit" value="Ingresar"  onClick={validar}/>
        </form>
        <div className="ax-form__utils">
          <Link to="/register"> ¿No tienes una cuenta? </Link>
        </div>
      </div>
    </div>


  )
}

export default Login