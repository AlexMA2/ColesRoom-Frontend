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
import imageUrl from '../../imgs/CourseBackgroundDefault.jpg';
import Button from '@material-ui/core/Button'
import { Redirect, useHistory } from 'react-router-dom';

import './Course.css'

const Course = ({ curso_id, name, category, user_id, description, image, datecreate }) => {
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

    useEffect(() => {
        seeCoursesJoin()
        console.log(desicion)
    })

    const seeCoursesJoin = async () => {
        const res = await fetch(`api/courses/join/${sessionStorage.getItem("user")}`)
        const data = await res.json()
        for (const cursoID of data) {
            if (cursoID === curso_id) {
                setDesicion(true)
            }
        }
    }

    const seeCourse = (ev) => {
        history.push(`mycourses/${curso_id}`);
    };
    return (
        <Card className={classes.root}>
            {click && <Redirect to={curso_id} />}
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={datecreate}
            />
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
                    user_id === sessionStorage.getItem("user")
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
                                        Ver
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
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
        </Card>
    );
};

export default Course;