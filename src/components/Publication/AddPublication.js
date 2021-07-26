import React, { useState } from 'react'
import { Avatar, Button } from '@material-ui/core'

import './Publication.css'
import PublicationInput from './PublicationInput';

const AddPublication = ({ handleSubmit , imgPerfil}) => {

    const [click, setclick] = useState(false)    
       
    const handleClick = (event) => {        
        let cl = !click
        setclick(cl)
    }    

    return (
        <div className="addpubli">
            {
                click
                    ? <PublicationInput handleCancel={handleClick} handleSubmit={handleSubmit}/>
                    :
                    <div className="addpubli_create" onClick={handleClick}>
                        <Avatar alt="Remy Sharp" src={imgPerfil} />
                        <Button size="medium" color="secondary" onClick={handleClick} > Crea una publicaci&oacute;n </Button>
                    </div>
            }



        </div>
    )
}

AddPublication.defaultProps = {
    imgPerfil : 'https://cdn.pixabay.com/photo/2017/04/26/09/00/avatar-5270037_960_720.png'
}

export default AddPublication
