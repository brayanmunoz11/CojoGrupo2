import React, { useEffect, useState } from "react";
import '../../utils.css'
import { Form, Button, FormControl } from 'react-bootstrap';
import "./CreateTask.css"
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const validarCampos = (e) => {
    var nom=  document.getElementById("nombre").value.replace(/\s+/g, '')
    var ap=  document.getElementById("des").value.replace(/\s+/g, '')
    if(nom===""||ap===""){
      alert("Rellene todos los campos!!");
    }
  };

const CreateTask = () => {

    const [date, setTime] = useState("")
    const [filesid,setfilesid] = useState([])

    const [camposInvalidos, setcamposInvalidos] = useState(false)

    let history = useHistory();

    const CrearTarea = (e) => {
        
        e.preventDefault();
        const form = e.target;
        const data = {
            course_id: sessionStorage.getItem("IDCourse"),
            content: "TAREA: " + form.title.value + " -> " + form.description.value,
            type: 0,
            route: filesid
        };
        console.log(form.title.value, form.description.value)
        if (form.title.value === "" || form.description.value === "") {
            console.log(form.title.value, form.description.value)
            setcamposInvalidos(true)
        } else {
            fetch('https://colesroomgrupo.herokuapp.com/api/publications', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => { return response.json() })
            let topic = sessionStorage.getItem("IDCourse")
            sessionStorage.removeItem("IDCourse")
            alert("TAREA CREADA")
            history.push(`/mycourses/${topic}`);
        }
    }

    const handleUploadFiles = (ev) => {
        let input = ev.target;
        if (input.files && input.files[0]) {
            let file = input.files[0];
            if (file.size > 1048576) {
                alert('El archivo es demasiado grande. El peso del archivo debe ser menor a 1 mb');
                input.value = ""
            } else {
                const fileObj = {
                    name: input.files[0].name,
                    size: input.files[0].size,
                    type: input.files[0].type,
                }
                fetch('https://colesroomgrupo.herokuapp.com/upload', {
                    method: 'POST',
                    body: JSON.stringify(fileObj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(response => { return response.json() })
                    .then(json => {
                        if (json) {
                            setfilesid([json.fileID])
                        }
                    })
                    .catch(error => {
                        console.log('Error: ' + error)
                    })
            }
        }
    }

    useEffect(() => {
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-dTH:M:S');
        console.log(formatted)
        setTime(formatted)
    }, [])


    return (
        <div className="form-group-content">
            <div className="content-form">
                <h1>CREAR TAREA</h1>
                <Form className="Form" onSubmit={CrearTarea}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Nombre de la Tarea</Form.Label>
                        <Form.Control id="nombre" size="lg" name="title" type="text" placeholder="Nombre de la Tarea" />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripcion de la tarea</Form.Label>
                        <FormControl type="text" name="description" as="textarea" rows="3" style={{ resize: "none" }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Subir Archivo (Opcional)</Form.Label>
                        <br></br>
                        <input
                            accept="image/*,.pdf"
                            id="contained-button-file"
                            type="file"
                            onChange={handleUploadFiles}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <p>Seleccione Fecha Limite</p>
                        <div className="contenedor">
                            <div className="center">
                                <input type="datetime-local" defaultValue={date}
                                    min={date} name="date" />
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Crear Tarea
                    </Button>
                </Form>
                {
                    camposInvalidos
                        ? <div>    
                            <br></br>
                            <Alert severity="error">Campos Vacios</Alert>
                        </div>
                        :
                        <br></br>
                }
            </div>
        </div>
    );
}

export default CreateTask