import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button'
import { Redirect, useHistory } from 'react-router-dom';
import MenuCourse from './MenuCourse';
import image1 from '../../imgs/CourseBackground1.jpg'
import image2 from '../../imgs/CourseBackground2.jpg'
import image3 from '../../imgs/CourseBackground3.jpg'
import './Course.css'

const Course = ({ curso_id, name, category, teacher_id, description, image, datecreate, viewDelete }) => {
    var imageUrl =""
    const [dateformat, setdateformat] = useState('')
    const [anchorMenuCourse, setAnchorMenuCourse] = useState(null)
    const [viewDeleteCourse, setViewDeleteCourse] = useState(viewDelete)

    const isMenuOpen = Boolean(anchorMenuCourse)
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            margin: "5px",
            "&:hover": {
                boxShadow: "2px 8px 8px #cfcfcf",
            },
            border: "1px solid #D9D9D9",
        },
        media: {
            height: "0",
            paddingTop: "56.25%", // 16:9
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        avatar: {
            backgroundColor: red[500],
        },
        sizeSmall: {
            width: "3.75rem",
            height: "1.875rem",
            fontSize: "0.8rem",
            textTransform: "capitalize",
        },
    }));

    const classes = useStyles();
    const [click, setClick] = useState(false);
    const [desicion, setDesicion] = useState(false);
    const history = useHistory();

    const joinCourse = (ev) => {
        const data = {
            userID: sessionStorage.getItem("user"),
            courseID: curso_id
        }
        fetch('/api/join', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => 'Hubo un problema');
        history.push(`mycourses/${curso_id}`);
        setClick(true);
    };


    const seeCoursesJoin = async () => {
        const res = await fetch(`api/course/join/${sessionStorage.getItem("user")}`)
        const data = await res.json()
        for (const cursoID of data) {
            if (cursoID === curso_id) {
                setDesicion(true)
            }
        }
    }

    const seeCourse = (ev) => {
        history.push(`mycourses/${curso_id}`);
        setClick(true);
        
    };

    const openMenuCourse = (ev) => {
        setAnchorMenuCourse(ev.currentTarget);
    }

    const closeMenuCourse = (isDeleted) => {
        setAnchorMenuCourse(null);
    }

    useEffect(() => {
        const df = new Intl.DateTimeFormat('es', { dateStyle: 'full', timeStyle: 'long' })
        const dateToFormat = new Date(datecreate)
        const dateTransform = new Date(Date.UTC(
            dateToFormat.getFullYear(),
            dateToFormat.getMonth(),
            dateToFormat.getDate(),
            dateToFormat.getUTCHours(),
            dateToFormat.getUTCMinutes(),
            dateToFormat.getUTCSeconds()));

        setdateformat(df.format(dateTransform))

        setViewDeleteCourse(teacher_id === sessionStorage.getItem('user'))
        seeCoursesJoin()      

    }, [datecreate, teacher_id])

    if(image==='f2'){
        imageUrl=image2
    }else if (image==='f3'){
        imageUrl=image3
    }else{
        imageUrl=image1
    }
    return (
        <Card className={classes.root}>
            {click && <Redirect to={curso_id} />}
            {
                viewDeleteCourse
                    ?
                    <CardHeader
                        action={
                            <IconButton aria-label="settings" onClick={openMenuCourse}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={name}
                        subheader={'Creado el ' + dateformat}
                    />
                    :
                    <CardHeader
                        title={name}
                        subheader={'Creado el ' + dateformat}
                    />
            }

            <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className="limit-description">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className="separar">
                {
                    teacher_id === sessionStorage.getItem("user")
                        ?
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.sizeSmall}
                            onClick={seeCourse}>
                            Ver
                        </Button>
                        :
                        <div>
                            {
                                desicion
                                    ?
                                    <Button
                                        variant="contained"
                                        color="default"
                                        size="small"
                                        className={classes.sizeSmall}
                                        onClick={seeCourse}>
                                        Entrar
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size='small'
                                        className={classes.sizeSmall}
                                        onClick={joinCourse}>
                                        Unirse                                                
                                    </Button>

                            }
                        </div>

                }
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            {<MenuCourse anchorEl={anchorMenuCourse} menuId={curso_id} isMenuOpen={isMenuOpen} handleMenuClose={closeMenuCourse} />}
        </Card>
    );
};

Course.defaultProps = {
    viewDelete: false,
};

export default Course;