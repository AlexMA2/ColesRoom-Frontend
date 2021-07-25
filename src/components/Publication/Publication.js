import React, { useState, useEffect } from 'react'
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PublicationInput from './PublicationInput'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Publication = ({ p, onDelete, viewControls }) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [publication, setPublication] = useState(p);
    const [publicationContent, setPublicationContent] = useState(p.content)
    const [files, setFiles] = useState([])

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

        fetch(`/file/deleteAll`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filesIds: publication.route
            })

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
                    console.log()
                }
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
    };

    useEffect(() => {
        // Fetch a publicacion. routes para coger los valores de esos ids.
        setPublication(p);
        fetch('/file', {
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
                console.log("-----------------")
                if (data) {
                    console.log(data)
                    setFiles(data)
                }
            })
            .catch(err => {
                console.log(err);
            });

    }, [p])

    const handleDeleteFile = (fileID) => {
        setFiles(files.filter(file => file._id !== fileID))
        fetch(`/file/${fileID}/delete`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

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
                    console.log()
                }
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
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
                                filesDefault={publication.route}
                                valueDefault={publicationContent}
                                publicationID={p._id}
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
            <div className="publication__date">
                {/* {p.datePublished} */}
                Creado hace 2 dias - 18/02/2019 07:00:05
            </div>
            <div className="publication__content">
                {publicationContent}
            </div>
            <div className="publication__files">
                {files.map((file, index) =>
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
        </div>
    )
}

export default Publication
