import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory, Redirect  } from "react-router"

import CourseTitle from "../../components/CourseTitle/CourseTitle.js"

import PublicationContainer from "../../components/Publication/PublicationContainer.js"
import AddPublication from "../../components/Publication/AddPublication.js"
import { Button } from "@material-ui/core"
import imgFakePerfil from '../../imgs/fakePerfil.png'
import "../../utils.css"
import SimpleModal from './SimpleModal.js';


const CoursePage = () => {
  let { topic } = useParams()

  const [publicaciones, setPublicaciones] = useState([])
  const [course, setCourse] = useState({})
  const [teacher, setTeacher] = useState({})
  const [activeAddPublication, setactiveAddPublication] = useState(false)

  useEffect(() => {

    const fetchPublications = async () => {
      const res = await fetch(`https://colesroomapp.herokuapp.com/api/publications/${topic}`)
      return res.json()
    }
  
    const fetchCourse = async () => {
      const res = await fetch(`https://colesroomapp.herokuapp.com/api/courses/${topic}`)
      return res.json()
    }
  
    const fetchTeacher = async (teacher_id) => {
      const res = await fetch(`https://colesroomapp.herokuapp.com/teacher/${teacher_id}`)
      return res.json()     
    }


    const getPublications = async () => {
      const p = await fetchPublications()
      setPublicaciones(p)
    }

    //Get the course user_id
    const getTeacher = async (teacher_id) => {
      const t = await fetchTeacher(teacher_id)
      setTeacher(t)
    }

    const getCourse = async () => {
      const c = await fetchCourse()
      getTeacher(c.user_id)
      setCourse(c)
    }

    getPublications()
    getTeacher()
    getCourse()

  }, [topic])


  useEffect(() => {
    setactiveAddPublication(sessionStorage.getItem("user") === course.user_id)
  }, [course])

  const handleSubmit = (value) => {
    value.course_id = topic

    fetch('https://colesroomapp.herokuapp.com/api/publications', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(value)
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        setPublicaciones([...publicaciones, json])
      })
      .catch(error => {
        console.log(error)
      })

  }  

  const [click, setClick] = useState(false)
  const history = useHistory()
  const irTopic = `${topic}/taskcreate`

  const handleClick = (ev) => {
    history.push(irTopic)
    sessionStorage.setItem("IDCourse",topic)
    setClick(true)
  }

  return (

    <div className="container3" >
      {
        click &&
        <Redirect to={irTopic} />
      }
      <CourseTitle name={course.name}
        description={course.description}
        date={course.datecreate}
        backgroundImage={course.image}
        onEdit={handleClick}
        category={course.category}
        topic={topic}
        teacher_id={course.user_id }
      />
      
      {
        activeAddPublication &&
        <div style={{ "marginBottom": "15px", display:"flex", alignItems:"center"}}>
          <Button variant="contained" color="primary" onClick={handleClick} style={{marginRight:"15px"}}>
            Crear Tarea
          </Button>
          <SimpleModal/>
        </div>
      }
      {
        activeAddPublication &&
        <AddPublication handleSubmit={handleSubmit} imgPerfil={imgFakePerfil} />
      }
      {
        publicaciones.length > 0 ?
          <PublicationContainer publications={publicaciones} teacherId={course.user_id} />
          : <h2 style={{ marginTop: '1rem', fontStyle: 'italic' }}>No hay publicaciones</h2>
      }

    </div>
  );
};

export default CoursePage