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
  const [render, setrender] = useState(false)
  const [course, setCourse] = useState({})

  const handleSubmit = (value) => {       
    let pub = publicaciones
    pub.push(value)
    setPublicaciones(pub)
    setrender(render + 1)    
  }

  const data = {};


  useEffect(() => {

  }, [])

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
        teacher="profesor"
      />
      <div style={{"marginBottom":"15px"}}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Crear Curso
        </Button>
      </div>
      <AddPublication handleSubmit={handleSubmit} imgPerfil={imgFakePerfil}/>

      <PublicationContainer publications={publicaciones} />
    </div>
  )
}

export default CoursePage