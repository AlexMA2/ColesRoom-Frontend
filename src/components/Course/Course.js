import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import imageUrl from '../../Fondo.jpg';
import Button from '@material-ui/core/Button'
import {Redirect, useHistory} from 'react-router-dom';

import './Course.css'

const Course = ({ id, curso_id, name, category, teacher_id }) => {
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

    const getDay = () => {
        //obtener fecha de la BD
        let fecha = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
        let dtf = new Intl.DateTimeFormat("es-GB", { dateStyle: "long" }).format(
            fecha
        );
        return dtf;
    };

    const [click, setClick] = useState(false);

    const history = useHistory();
    const irTopic = `/mycourses/${id}`;

    const handleClick = (ev) => {
        history.push(irTopic);
        setClick(true);
        inscribirseCurso();
        buscarCurso()
    };
    function buscar() {
        let idUser = 1;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                idUser = user.uid;
            } else {
                alert("no hay usuario registrado")
                history.push("/login");
            }
        });
        
    }
    function buscarCurso() {

        var ref = firebase.database().ref("Alumno-Curso")
        ref.once("value").then(function (snapshot) {

            var aula = snapshot.child().val(); // {Asignatura:"lenguaje",Curso:"8A"} Esta linea me devuelve un objeto con todos los valores de ese child
            var asignatura = snapshot.child().val(); // "Lenguaje"
            //var curso = snapshot.child(codigo).child("Curso").val(); // "8A"
            console.log(aula)
            console.log(asignatura)

        });
    }
    function inscribirseCurso() {
        const info = {
            user_id: "",
            curso_id: id,
            nota: 0,
        }
        let nombre_val = "-MdriIuPvM2RKZePnY6F";
        alert(nombre_val);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                info.user_id = user.uid;
                firebase.database().ref(`Alumno-Curso/${nombre_val}`).push(info);
                alert("reistrado");
            } else {
                //alert("no hay usuario registrado")
                history.push("/login");
            }
        });
        buscarCurso()
    }

    return (
        <Card className={classes.root}>
            {click && <Redirect to={irTopic} />}
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {name.substring(0, 1)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={name}
                subheader={getDay()}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the
                    mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing className="separar">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.sizeSmall}
                    onClick={handleClick}
                >
                    Unirse
                </Button>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Course;