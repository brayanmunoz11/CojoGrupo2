import React, {useState} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const MenuCourse = ({ anchorEl, isMenuOpen, menuId, handleMenuClose }) => {

    const [isDialogDeleteOpen, setisDialogDeleteOpen] = useState(false)
    const [snackbar, setSnackbar] = useState({type: 'success', message: '', open: false})

    const openSB = (type, message) => {
        setSnackbar({ type, message, open: true })
    }

    const closeSB = () => {
        setSnackbar({ ...snackbar, open: false })
    }

    const deleteCourse = () => {
        
        let filesIds = []

        const deletingCourses = async () => {
            const data = await fetchDeleteCourse()
            console.log(data)
            data.forEach(dp => {
                filesIds = filesIds.concat(dp.route)
            });
            console.log(filesIds)
            await fetchDeleteAllPublicationsFiles(filesIds)
            openSB('success', 'El curso ha sido eliminado . Pulsa (F5) ')
        }

        deletingCourses()
    }

    const fetchDeleteCourse = async () => {
        const res = await fetch(`https://colesroomgrupo.herokuapp.com/api/courses/${menuId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return res.json()        
    }

    const fetchDeleteAllPublicationsFiles = async (filesIds) => {
        const response = await fetch(`https://colesroomgrupo.herokuapp.com/file/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filesIds: filesIds
            })

        })
        return response.json()        
    }

    const openDialogDelete = () => {
        setisDialogDeleteOpen(true)
    }

    const closeDialogDelete = (isDeleted) => {
        setisDialogDeleteOpen(false)
        handleMenuClose(isDeleted);
    }

    return (
        <div>
            <Dialog
                open={isDialogDeleteOpen}
                onClose={closeDialogDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Estás seguro de querer eliminar este curso?"}</DialogTitle>

                <DialogActions>
                    <Button onClick={() => closeDialogDelete(false)} color="primary">
                        No, d&eacute;jalo.
                    </Button>
                    <Button onClick={() => { closeDialogDelete(true); deleteCourse() }} color="primary" autoFocus>
                        Sí, elim&iacute;nalo
                    </Button>
                </DialogActions>
            </Dialog>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                id={menuId}
                getContentAnchorEl={null}
                transformOrigin={{ vertical: 'top', horizontal: 'center', }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={openDialogDelete}> Eliminar curso </MenuItem>
            </Menu>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={closeSB} >
                <MuiAlert onClose={closeSB} severity={snackbar.type} elevation={6} variant="filled">
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>

    )
}

export default MenuCourse
