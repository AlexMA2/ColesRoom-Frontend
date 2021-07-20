import React, { useState } from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Publication = ({ p }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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



    return (
        <div className="publication">
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Editar publicación </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Elimina archivos pulsando en la X de cada archivo.
                        Sube los archivos pulsando en el botón "Subir".
                        Para que se muestren los cambios pulsa el botón "Guardar Cambios".
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Edita la publicación"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleCloseEdit} color="primary">
                        Subir archivos
                    </Button>
                    <Button onClick={handleCloseEdit} color="primary">
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Est&aacute;s seguro de querer eliminar esta publicaci&oacute;n?"}</DialogTitle>
                
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        No, no quiero eliminarlo.
                    </Button>
                    <Button onClick={handleCloseDelete} color="primary" autoFocus>
                        Sí, quiero elim&iacute;narlo.
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
            <div className="publication__date">
                {/* {p.datePublicated} */}
                Creado hace 2 dias - 18/02/2019 07:00:05
            </div>
            <div className="publication__content">
                {p.content}
            </div>
            <div className="publication__files">
                {p.route.map((path, index) =>
                    <div className="publication__file" key={index}>
                        <a href={path} target="_blank">{<DescriptionIcon fontSize="large" />}</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Publication
