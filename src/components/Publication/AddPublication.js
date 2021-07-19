import React, { useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { Avatar, Button, ButtonGroup, TextField, makeStyles } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';

import './Publication.css'

const AddPublication = ({ handleSubmit , imgPerfil}) => {

    const [click, setclick] = useState(false)
    const [value, setValue] = useState('');
    const [files, setFiles] = useState([]);
    
    const [disabledBtn, setDisabledBtn] = useState(true)

    const handleChange = (event) => {
        setValue(event.target.value);
        if(value.length > 0 && disabledBtn){
            setDisabledBtn(false)
        }
        else if (value.length <= 1){
            setDisabledBtn(true)
        }                
    }    
    
       
    const handleClick = (event) => {
        setValue('')
        setDisabledBtn(true)
        let cl = !click
        setclick(cl)
    }

    const handleSend = (ev) => {
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

    return (
        <div className="addpubli">
            {
                click
                    ? <div className="addpubli_input">
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
                        <ButtonGroup >

                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                                onClick={handleSend}
                            >
                                Subir
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleClick}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={disabledBtn}
                                onClick={() => {handleSubmit({content: value, type: 1, route: files}); handleClick()}}
                            >
                                Enviar
                            </Button>

                        </ButtonGroup>
                    </div>
                    :
                    <div className="addpubli_create" onClick={handleClick}>
                        <Avatar alt="Remy Sharp" src={imgPerfil} />
                        <Button size="medium" color="secondary" onClick={handleClick} > Crea una publicaci&oacute;n </Button>
                    </div>
            }



        </div>
    )
}

export default AddPublication
