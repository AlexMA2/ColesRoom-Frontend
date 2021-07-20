import React, {useState, useEffect} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const MenuProfile = ({logout, anchorEl, isMenuOpen, menuId, handleMenuClose}) => {
    
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
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
        </Menu>

    )
}

export default MenuProfile
