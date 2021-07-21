import React, { useState } from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PublicationInput from './PublicationInput'

const Publication = ({ p, onDelete }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [publication, setPublication] = useState(p);
    const [publicationContent, setPublicationContent] = useState(p.content)

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
        
        fetch(`/api/publications/${publication._id}`, {
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
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDelete = () => {        
        fetch(`/api/publications/${publication._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(json => {
                setOpenEdit(false);
                setOpenDelete(false);
                onDelete(publication._id)
            })
            .catch(err => {
                console.log(err);
            });
    };



    return (
        <div className="publication">
            
            <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Editar publicación </DialogTitle>
                <DialogContent>
                    <PublicationInput handleCancel={handleCloseEdit}
                        handleSubmit={handleEdit}
                        filesDefault={publication.route}
                        valueDefault={publicationContent}
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
            <div className="publication__date">
                {/* {p.datePublicated} */}
                Creado hace 2 dias - 18/02/2019 07:00:05
            </div>
            <div className="publication__content">
                {publicationContent}
            </div>
            <div className="publication__files">
                {publication.route.map((path, index) =>
                    <div className="publication__file" key={index}>
                        <a href={path} target="_blank" rel="noreferrer">{<DescriptionIcon fontSize="large" />}</a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Publication
