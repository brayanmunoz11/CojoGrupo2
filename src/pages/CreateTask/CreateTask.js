import React, { useEffect, useState } from "react";
import '../../utils.css'
import { Form, Button, FormControl } from 'react-bootstrap';
import "./CreateTask.css"
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const CreateTask = () => {

    const [date, setTime] = useState("")
    const [files, setFiles] = useState([]);
    const [filesID, setFilesID] = useState([]);

    let history = useHistory();
    const CrearTarea = (e) => {
        e.preventDefault();
        const form = e.target;

        const data = {
            course_id: sessionStorage.getItem("IDCourse"),
            content: form.description.value,
            type: 0
        };

        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    console.log('Error: ' + response.status + ' ' + response.statusText)
                }
            })
            .then(json => {
                if (json) {
                    setFiles([...files, json.file])
                    setFilesID([...filesID, json.fileID])
                }
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
        let topic = sessionStorage.getItem("IDCourse")
        sessionStorage.removeItem("IDCourse")
        history.push(`/mycourses/${topic}`);
    }


    const [hourError, sethourError] = useState("")
    const [disabled, setdisabled] = useState("")
    const handleChangeInput = evento => {
        const { value } = evento.target;
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-dTH:M:S');
        if (value < formatted) {
            sethourError(true)
        } else {
            sethourError(false)
        }

    }

    const validaciones = e => {
        
    }


    useEffect(() => {
        var dateTime = require('node-datetime');
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-dTH:M:S');
        console.log(formatted)
        setTime(formatted)
        sethourError(false)
        setdisabled(true)
    }, [])


    return (
        <div className="form-group-content">
            <div className="content-form">
                <h1>CREAR TAREA</h1>
                <Form className="Form" onSubmit={CrearTarea}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Nombre de la Tarea</Form.Label>
                        <Form.Control size="lg" name="title" type="text" placeholder="Nombre de la Tarea" onChange={handleChangeInput}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripcion de la tarea</Form.Label>
                        <FormControl type="text" name="description" as="textarea" rows="3" style={{ resize: "none" }} onChange={handleChangeInput}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Subir Archivo (Opcional)</Form.Label>
                        <Form.File id="exampleFormControlFile1" name="File" />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <p>Seleccione Fecha Limite</p>
                        <div className="contenedor">
                            <div className="center">
                                <input type="datetime-local" defaultValue={date}
                                    min={date} name="date" onChange={handleChangeInput} />
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Crear Tarea
                    </Button>
                </Form>
                {
                    hourError
                        ? <div>
                            <br></br>
                            <Alert severity="error">Hora Incorrecta</Alert>
                        </div>
                        : <br></br>
                }
            </div>
        </div>
    );
}

export default CreateTask