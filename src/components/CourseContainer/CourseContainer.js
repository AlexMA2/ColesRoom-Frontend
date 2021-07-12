import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'

import { useSelector } from 'react-redux'

const CourseContainer = ({ coursesList }) => {
    const search = useSelector(state => state.search)   

    const condition = (co) => (co.nombre.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="course-container">
            
            <div className="grid-courses">
                {
                    coursesList.filter(condition).length
                        ? coursesList.filter(condition).map((co) => (<Course id={co.id}
                            curso_id={co.curso_id}
                            name={co.nombre}
                            category={co.categoria}
                            teacher_id={co.user_id} />))
                        : <h2> No hay cursos </h2>
                }
                
            </div>
        </div>

    )
}

CourseContainer.defaultProps = {
    filterSearch: "",
    coursesList: []
}


export default CourseContainer
