import React, { useState, useEffect } from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PublicationInput from './PublicationInput'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Publication = ({ p, onDelete, viewControls }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [publication, setPublication] = useState(p);
    const [publicationContent, setPublicationContent] = useState(p.content)
    const [publicationfiles, setpublicationFiles] = useState([])

    const [snackbar, setSnackbar] = useState({ type: 'success', message: '', open: false })

    const openSB = (type, message) => {
        setSnackbar({ type, message, open: true })
    }

    const closeSB = () => {
        setSnackbar({ ...snackbar, open: false })
    }

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleEdit = (newValue) => {

        fetch(`https://colesroomgrupo.herokuapp.com/api/publications/${publication._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newValue.content,
                files: newValue.route
            })
        })
            .then(res => res.json())
            .then(json => {
                setPublication(json)
                setOpenEdit(false)
                setOpenDelete(false)
                setPublicationContent(newValue.content)
                openSB('success', 'Publicación actualizada! ')
            })
            .catch(err => {
                openSB('error', err)
                console.log(err);
            });
    };

    const handleDelete = () => {
        console.log("DELETE ")
        fetch(`https://colesroomgrupo.herokuapp.com/api/publications/${publication._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                setOpenEdit(false)
                setOpenDelete(false)
                onDelete(publication._id)
                openSB('success', 'Publicación eliminada! ')
            })
            .catch(err => {
                openSB('error', err)
                console.log(err);
            });

        fetch(`https://colesroomgrupo.herokuapp.com/file/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filesIds: publication.route
            })

        })
        .then(json => {            
            openSB('success', 'Publicación eliminada! ')
        })
        .catch(err => {
            openSB('error', err)
            console.log(err);
        });
    };

    useEffect(() => {
        // Fetch a publicacion. routes para coger los valores de esos ids.
        setPublication(p);
        fetch('https://colesroomgrupo.herokuapp.com/file', {
            method: 'POST',
            body: JSON.stringify({
                files: p.route,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setpublicationFiles(data)
                }
            })
            .catch(err => {
                console.log(err);
                openSB('error', err)
            });

    }, [p])

    const handleDeleteFile = (fileID) => {
        setpublicationFiles(publicationfiles.filter(file => file._id !== fileID))
        fetch(`https://colesroomgrupo.herokuapp.com/file/${fileID}/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    openSB('success', 'Archivo eliminado! ')
                }
            }
            )
            .catch(err => {
                openSB('error', err)
            })
    }

    const sendFiles = (f) => {
        setpublicationFiles(f)
    }

    return (
        <div className="publication">

            {
                viewControls &&
                <div>
                    <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"> Editar publicación </DialogTitle>
                        <DialogContent>
                            <PublicationInput handleCancel={handleCloseEdit}
                                handleSubmit={handleEdit}
                                filesDefault={publicationfiles}
                                valueDefault={publicationContent}
                                sendFiles={sendFiles}
                            />
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"¿Estás seguro de querer eliminar esta publicación?"}</DialogTitle>

                        <DialogActions>
                            <Button onClick={handleCloseDelete} color="primary">
                                No, d&eacute;jalo.
                            </Button>
                            <Button onClick={() => { handleCloseDelete(); handleDelete() }} color="primary" autoFocus>
                                Sí, elim&iacute;nalo
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="publication__controls">
                        <Button variant="outlined" color="primary" onClick={handleClickOpenEdit}>
                            Editar
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleClickOpenDelete}>
                            Eliminar
                        </Button>
                    </div>
                </div>
            }

            <div className="publication__content">
                {publicationContent}
            </div>
            <div className="publication__files">
                {publicationfiles.map((file, index) =>
                    <div className="publication__file" key={index}>
                        {
                            viewControls &&
                            <div style={{ display: 'flex', alignSelf: 'center' }} onClick={() => { handleDeleteFile(file._id) }}>
                                <HighlightOffIcon />
                            </div>
                        }
                        <a href={file.path} target="_blank" rel="noreferrer">{<DescriptionIcon fontSize="large" />}</a>
                        <p> {file.filename} </p>
                    </div>
                )}
            </div>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSB} >
                <MuiAlert onClose={closeSB} severity={snackbar.type} elevation={6} variant="filled">
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default Publication
