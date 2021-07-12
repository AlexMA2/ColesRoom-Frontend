import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'

const CourseContainer = ({ filterSearch, coursesList }) => {
    return (
        <div className="course-container">
            {console.log(filterSearch)}
            <div className="grid-courses">
                {            
                    coursesList.filter((co) => co.nombre.includes(filterSearch)).length
                    ? coursesList.filter((co) => co.nombre.includes(filterSearch)).map((co) => (
                    <Course id={co.id}
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
