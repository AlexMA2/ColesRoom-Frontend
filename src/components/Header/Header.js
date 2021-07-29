import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import logotipo from "../../imgs/logo.png"
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../redux/index.js'
import { Button } from "@material-ui/core";
import MenuProfile from "./MenuProfile.js";
import MobileMenuPrivate from "./MobileMenuPrivate.js";
import MobileMenuPublic from "./MobileMenuPublic.js";

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

    const registrar = (e) => {
        history.push("/mycourses/crear")
    }

    let history = useHistory();
    const logout = () => {
        sessionStorage.clear();
        history.push("/");
        window.location.reload();
    }

    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,

        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'block',
            minWidth: '110px'

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
            display: "flex"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
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

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'primary-search-account-menu'
    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <div className={classes.grow} style={{ marginBottom: "4.5rem" }}>
            <AppBar position="fixed">
                <Toolbar>
                    <a href="/" className="imgCss">
                        <img src={logotipo} alt="Logotipo" style={{ width: "150px" }}></img>
                    </a>
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
                        user !== ''
                            ? (
                                <div className="div-divertido">
                                    <div className="div-divertido2">
                                        <Button variant="contained" color="default" className="ButtonP" onClick={registrar}>
                                            Crear Curso
                                        </Button>
                                    </div>
                                    {<MobileMenuPrivate mobileMoreAnchorEl={mobileMoreAnchorEl}
                                        isMobileMenuOpen={isMobileMenuOpen}
                                        mobileMenuId={mobileMenuId}
                                        handleMobileMenuClose={handleMobileMenuClose}
                                        handleProfileMenuOpen={handleProfileMenuOpen} />}
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
                                    {<MobileMenuPublic mobileMoreAnchorEl={mobileMoreAnchorEl}
                                        isMobileMenuOpen={isMobileMenuOpen}
                                        mobileMenuId={mobileMenuId}
                                        handleMobileMenuClose={handleMobileMenuClose} />}
                                    <div className={classes.sectionDesktop}>
                                        <Link to="/login" className="btn-link"> Iniciar Sesi&oacute;n</Link>
                                        <Link to="/register" className="btn-link"> Registrarte </Link>
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
                    }
                </Toolbar>
            </AppBar>

            {<MenuProfile logout={logout} anchorEl={anchorEl} isMenuOpen={isMenuOpen} menuId={menuId} handleMenuClose={handleMenuClose} />}
        </div>
    );
};

Header.defaultPropt = { user: '' }
export default Header;