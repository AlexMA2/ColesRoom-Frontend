import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router"
import { Redirect } from "react-router"
import CourseTitle from "../../components/CourseTitle/CourseTitle.js"

import PublicationContainer from "../../components/Publication/PublicationContainer.js"
import AddPublication from "../../components/Publication/AddPublication.js"
import { Button } from "@material-ui/core"
import imgFakePerfil from '../../imgs/fakePerfil.png'
import "../../utils.css"


const CoursePage = () => {
  let { topic } = useParams()

  const [publicaciones, setPublicaciones] = useState([])
  const [course, setCourse] = useState({})
  const [teacher, setTeacher] = useState({})
  const [activeAddPublication, setactiveAddPublication] = useState(false)

  useEffect(() => {

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
      const c = await fetchCourse(topic)
      getTeacher(c.user_id)
      setCourse(c)
    }

    getPublications()
    getCourse()

  }, [topic])


  useEffect(() => {
    setactiveAddPublication(sessionStorage.getItem("user") === course.user_id)
  }, [course])

  const handleSubmit = (value) => {
    value.course_id = topic

    fetch('/api/publications', {
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

  const fetchPublications = async () => {
    const res = await fetch(`api/publications/${topic}`)
    const data = await res.json()

    return data
  }

  const fetchCourse = async (topic) => {
    const res = await fetch(`api/courses/${topic}`)
    const data = await res.json()

    return data
  }

  const fetchTeacher = async (topic) => {
    const res = await fetch(`teacher/${topic}`)
    const data = await res.json()

    return data
  }

  const [click, setClick] = useState(false)
  const history = useHistory()
  const irTopic = `${topic}/taskcreate`

  const handleClick = (ev) => {
    history.push(irTopic)
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
      />

      {
        activeAddPublication &&
        <div style={{ "marginBottom": "15px" }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Crear Tarea
          </Button>
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