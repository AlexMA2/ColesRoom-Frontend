import React, {useState} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'


const MenuCourse = ({ anchorEl, isMenuOpen, menuId, handleMenuClose }) => {

    const [isDialogDeleteOpen, setisDialogDeleteOpen] = useState(false)

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
        }

        deletingCourses()
    }

    const fetchDeleteCourse = async () => {
        const res = await fetch(`https://colesroomapp.herokuapp.com/api/courses/${menuId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        return data
    }

    const fetchDeleteAllPublicationsFiles = async (filesIds) => {
        const response = await fetch(`https://colesroomapp.herokuapp.com/file/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filesIds: filesIds
            })

        })
        const data = await response.json()
        return data
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
        </div>

    )
}

export default MenuCourse
