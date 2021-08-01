import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, TextField, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const PublicationInput = ({ handleCancel, handleSubmit, filesDefault, valueDefault, sendFiles }) => {
    
    const [files, setFiles] = useState([]);
    const [value, setValue] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [filesID, setFilesID] = useState([]);
    const handleChange = (event) => {
        setValue(event.target.value);
        if (value.length > 0 && disabledBtn) {
            setDisabledBtn(false)
        }
        else if (value.length <= 1) {
            setDisabledBtn(true)
        }
    }

    const cleanInput = () => {
        setValue('');
        setFiles([]);
    }

    const handleUploadFiles = (ev) => {
        let input = ev.target;

        if (input.files && input.files[0] && files.length <= 10) {
            setDisabledBtn(false)
            const fileObj = {
                name: input.files[0].name,
                size: input.files[0].size,
                type: input.files[0].type,
            }
            fetch('https://colesroomapp.herokuapp.com/upload', {
                method: 'POST',
                body: JSON.stringify(fileObj),
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

        }
    }

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(2),
        },
        avatar: {
            marginRight: theme.spacing(2),
        },
        input: {
            display: 'none',
        },
    }));

    const handleDeleteFile = (fileID) => {
        setFiles(files.filter(file => file._id !== fileID))
        setFilesID(filesID.filter(fileid => fileid !== fileID))
        fetch(`https://colesroomapp.herokuapp.com/file/${fileID}/delete`, {
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
                   
                }
            })
            .catch(error => {
                console.log('Error: ' + error)
            })
    }

    const classes = useStyles();

    useEffect(() => {
        setValue(valueDefault)
        setFiles(filesDefault)
        let filesid = filesDefault.map(file => file._id)
        setFilesID(filesid)
    }, [filesDefault, valueDefault]);

    return (
        <div className="addpubli_input">
            
            <TextField
                id="filled-multiline-flexible"
                label="Haz una publicación"
                multiline
                rowsMax={10}
                value={value}
                onChange={handleChange}
                variant="filled"
                rows={6}
                fullWidth
            />
            <div className="publication__files">
                {files.map((file, index) =>
                    <div className="publication__file" key={index}>
                        <div style={{ display: 'flex', alignSelf: 'end' }} onClick={() => { handleDeleteFile(file._id) }}>
                            <HighlightOffIcon />
                        </div>
                        <a href={file.path} target="_blank" rel="noreferrer">{<DescriptionIcon fontSize="large" />}</a>
                        <p> {file.filename} </p>
                    </div>
                )}
            </div>
            <ButtonGroup >

                <div style={{ margin: '16px 16px 0 0' }}>
                    <input
                        accept="image/*,.pdf"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={handleUploadFiles}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained"
                            color="secondary"
                            component="span"
                            startIcon={<CloudUploadIcon />}

                        >
                            Subir Archivos
                        </Button>
                    </label>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                        cleanInput();
                        handleCancel();
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={disabledBtn}
                    onClick={() => {
                        handleSubmit({
                            content: value,
                            type: 1,
                            route: filesID
                        });
                        cleanInput();
                        handleCancel();
                        sendFiles(files);
                    }}
                >
                    Enviar
                </Button>
                
            </ButtonGroup>

        </div>
    )
}

PublicationInput.defaultProps = {
    filesDefault: [],
    valueDefault: '',    
    sendFiles: (f) => {},
}

export default PublicationInput
