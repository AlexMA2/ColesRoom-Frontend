import React, { useEffect, useState } from "react"
import CourseContainer from "../../components/CourseContainer/CourseContainer"
import './Main.css'

import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography, Button, makeStyles} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import Banner from "../../components/Banner/Banner.js"


import imgBanner from '../../imgs/banner1.jpg'
import imgEnsenar from '../../imgs/ensenar.jpg'

const Main = () => {
  const [loading, setLoading] = useState(true)
  const [limitCourses, setLimitCourses] = useState(8)
  const [courses, setCourses] = useState([])
  const [coursesToShow, setcoursesToShow] = useState([])

  const container = (maxwidth) => {
    return {
      "maxWidth": maxwidth + "rem",
      "width": "100%",
      "margin": "0 auto",
      
    }
  }

  const showMore = () => {
    let limit = limitCourses
    setLimitCourses(limit + 8)
  }

  const fetchCourses = async () => {
    const res = await fetch('https://colesroomapp.herokuapp.com/api/courses')   
    
    return res.json()
  }

  useEffect(() => {    
    
    const getCourses = async () => {
      const coursesFromDB = await fetchCourses()
      setCourses(coursesFromDB)
      setcoursesToShow(coursesFromDB.slice(0, limitCourses))
      setLoading(false)
    }    

    getCourses()

  }, [limitCourses])

  const useStyles = makeStyles((theme) => ({
    margin: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <div style={container("90")}>
      <Banner imgBanner={imgBanner} 
              redir="/mycourses" 
              textButton="Ver mis cursos" 
              title={["Aprende", "más cada día", "a tu ritmo", "lo que te gusta"]} 
              paragraph="En ColesRoom podrás encontrar cientos de cursos gratuitos. Únete a nosotros"               
      />      
      <Typography variant="h3" gutterBottom>
        Elige lo que quieres aprender
      </Typography>
      {
        loading
        ? <CircularProgress size={100} className="center-block"/>                   
        : <CourseContainer coursesList={coursesToShow}></CourseContainer>
      }
      {
        courses.length > limitCourses &&
        <Button variant="contained" size="medium" color="secondary" onClick={showMore} className={classes.margin} endIcon={<AddIcon />}>
          Ver más cursos
        </Button>
      }
 
      <hr></hr>
      <Typography variant="h3" gutterBottom>
        Enseña lo que sabes 
      </Typography>
      <Banner imgBanner={imgEnsenar} 
              redir="/mycourses/crear" 
              textButton="Crear un curso" 
              title={["Enseña a", "mejorar", "progresar", "triunfar"]} 
              paragraph="Puedes ayudar a otras personas compartiendo tus conocimientos. Crea cursos e invita personas"               
      />
    </div>
  );
};

export default Main;
