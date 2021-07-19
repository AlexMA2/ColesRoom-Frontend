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
  const [render, setrender] = useState(false)
  const [render2, setrender2] = useState(false)
  const [course, setCourse] = useState({})

  //Falta testear
  const handleSubmit = (value) => {       
    value.course_id = topic    
    
    setrender(true)    
    
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
        let publis = publicaciones;
        
        publis.push(value)
        setPublicaciones(publis)
        setrender2(true)
      })
      .catch(error => {
        setrender2(true)
        console.log(error)
      })   

  }

  useEffect(() => {
    //Coger publicaciones de un curso
    fetch(`api/publications/${topic}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {        
        return response.json()
      }
    )
      .then(json => {
        setPublicaciones(json.publications)
        setrender(true)
        
      }
    )
      .catch(error => {
        console.log(error)
      }
    )

  }, [render2])

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
        {console.log(publicaciones)}
        <PublicationContainer publications={publicaciones} />
      </div>
    );
  };

export default CoursePage