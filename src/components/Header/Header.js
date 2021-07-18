import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'

import "./Header.css";

const Header = ({ user }) => {

    const [word, setword] = useState("");

    const handleChange = (e) => {
        let toSearch = e.target.value;
        setword(toSearch)
    }

    const dispatch = useDispatch()

    const { typeWord } = bindActionCreators(actionCreators, dispatch)

    const handlePressEnter = (e) => {        
        if (e.keyCode === 13) {
               
            typeWord(word) 
        }
    }

    let history = useHistory();
    const logout = () => {
        sessionStorage.clear();
        history.push("/");
    }

    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
            
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: '50%',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const [anchorElBurger, setAnchorElBurger] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const isMenuOpenBurger = Boolean(anchorElBurger);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenuBurgerClose = () => {
        setAnchorElBurger(null);
    };

    const handleProfileMenuBurgerOpen = (event) => {
        setAnchorElBurger(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu'
    const menuIdBurger = 'primary-search-account-menu-burger'
    const renderMenu = (
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
    );

    const renderMenuBurger = (
        <Menu
            anchorEl={anchorElBurger}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            id={menuIdBurger}
            getContentAnchorEl={null}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={isMenuOpenBurger}
            onClose={handleMenuBurgerClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to="/mycourses"> Mis cursos </Link></MenuItem>
            <MenuItem onClick={logout}>Cursos que enseño</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
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
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow} style={{marginBottom: "4.5rem"}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        aria-controls={menuIdBurger}
                        aria-haspopup="true"
                        onClick={handleProfileMenuBurgerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        ColesRoom
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Buscar curso..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                            onKeyDown={handlePressEnter}
                            tabIndex="0"
                        />
                    </div>
                    <div className={classes.grow} />
                    {
                        user !== undefined
                            ? (
                                <div>
                                    <div className={classes.sectionDesktop}>
                                        <IconButton aria-label="show 4 new mails" color="inherit">
                                            <Badge badgeContent={0} color="secondary">
                                                <MailIcon />
                                            </Badge>
                                        </IconButton>
                                        <IconButton aria-label="show 17 new notifications" color="inherit">
                                            <Badge badgeContent={0} color="secondary">
                                                <NotificationsIcon />
                                            </Badge>
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleMobileMenuOpen}
                                            color="inherit"
                                        >
                                            <MoreIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            )
                            : (
                                <div className="auth-buttons">
                                    <Link to="/login" className="btn-link"> Iniciar Sesi&oacute;n</Link>
                                    <Link to="/register" className="btn-link"> Registrarte </Link>
                                </div>

                            )
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderMenuBurger}
        </div>
    );
};

export default Header;