import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from 'react-router-dom'

const MenuProfile = ({logout, anchorEl, isMenuOpen, menuId, handleMenuClose}) => {

    const linkMyCourses = {
        color: '#000',
        textDecoration: 'none',
    }
    
    return (

        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            id={menuId}
            getContentAnchorEl={null}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Mi cuenta</MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to="/mycourses" style={linkMyCourses}>Mis Cursos</Link></MenuItem>            
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
        </Menu>

    )
}

export default MenuProfile
