import React, {useState} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useHistory } from "react-router-dom";

const MobileMenuPublic = ({mobileMoreAnchorEl, isMobileMenuOpen, mobileMenuId, handleMobileMenuClose}) => {   
   
    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to="/login" className="btn-link"> Iniciar Sesi&oacute;n</Link>                                       
            </MenuItem>
            <MenuItem>
                <Link to="/register" className="btn-link"> Registrarte </Link>
            </MenuItem>            
        </Menu>
    )
}

export default MobileMenuPublic
