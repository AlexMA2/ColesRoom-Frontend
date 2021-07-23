import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, TextField, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DescriptionIcon from '@material-ui/icons/Description';

const PublicationInput = ({ handleCancel, handleSubmit, filesDefault, valueDefault }) => {

    const [files, setFiles] = useState([]);
    const [value, setValue] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true)

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
        ev.preventDefault();
        //make a function to Upload               
    }

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(2),
        },
        avatar: {
            marginRight: theme.spacing(2),
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        setValue(valueDefault)
        setFiles(filesDefault)
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
                {files.map((path, index) =>
                    <div className="publication__file" key={index}>
                        <a href={path} target="_blank" rel="noreferrer">{<DescriptionIcon fontSize="large" />}</a>
                    </div>
                )}
            </div>
            <ButtonGroup >

                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    onClick={handleUploadFiles}
                >
                    Subir Archivos
                </Button>
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
                            route: files
                        });
                        cleanInput();
                        handleCancel();
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
    valueDefault: ''
}

export default PublicationInput
