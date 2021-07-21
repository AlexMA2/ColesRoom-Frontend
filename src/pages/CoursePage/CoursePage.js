import React, { useEffect, useState } from "react"
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

  useEffect(() => {
    
    const getPublications = async () => {
      const p = await fetchPublications()      
      setPublicaciones(p)      
    }

    getPublications()

  }, [])

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
      } )
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
                  <Redirect to={irTopic}/>  
              }
        <CourseTitle name={course.nombre}
          description="descripcion"
          date="fecha"
          photo="foto"
          backgroundImage="imagen"
          teacher={course.user_id}
        />
        <div style={{"marginBottom":"15px"}}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Crear Tarea
          </Button>
        </div>
        <AddPublication handleSubmit={handleSubmit} imgPerfil={imgFakePerfil} />
        
        {
          publicaciones.length > 0 &&
          <PublicationContainer publications={publicaciones} />
        }
        
      </div>
    );
  };

export default CoursePage