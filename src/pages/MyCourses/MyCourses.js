import CourseContainer from '../../components/CourseContainer/CourseContainer'
import React, { useEffect, useState } from 'react'
import { Button} from '@material-ui/core';
import './MyCourses.css'

const MyCourses = () => {

    const [cambios, setcambios] = useState(false)
    const [coursesListJoined, setCoursesListJoined] = useState('')
    const [coursesListCreated, setCoursesListCreated] = useState('')

    const container = (maxwidth) => {
        return {
            "maxWidth": maxwidth + "rem",
            "width": "100%",
            "margin": "0 auto",
            "paddingTop": "20px"
        }
    }

    const fetchCourseCreated = async () => {
        const res = await fetch(`https://colesroomapp.herokuapp.com/api/courses/created/${sessionStorage.getItem("user")}`)
        return res.json()        
    }


    const fetchCoursesJoined = async () => {
        const res = await fetch(`https://colesroomapp.herokuapp.com/api/courses/join/${sessionStorage.getItem("user")}`)
        return res.json()
    }


    useEffect(() => {

        const getCoursesCreated = async () => {
            const data = await fetchCourseCreated()
            setCoursesListCreated(data)
        }

        const getCoursesJoined = async () => {
            const data = await fetchCoursesJoined()
            setCoursesListJoined(data)
        }

        getCoursesCreated()
        getCoursesJoined()

    }, [])

    const cambio = cambiatectm => {
        if (cambiatectm === "cu") {
            setcambios(true)

        } else if (cambiatectm === "cc") {
            setcambios(false)
        }
    }

    return (
        <div style={container(75)}>
            {
                !cambios
                    ?
                    <div>
                        <div className="div-title-course">
                            <h1 style={{ "width": "70%" }}> Estos son los cursos que creaste</h1>
                            <div className="div-button-group">
                                <Button variant="contained" color="primary" onClick={() => { cambio("cc") }}>Cursos Creados</Button>
                                <Button variant="contained" color="secondary" onClick={() => { cambio("cu") }}>Cursos Unidos</Button>
                            </div>
                        </div>
                        {
                            coursesListCreated.length > 0 &&
                            <CourseContainer coursesList={coursesListCreated} />
                        }

                    </div>
                    :
                    <div>
                        <div className="div-title-course">
                            <h1 style={{ "width": "70%" }}> Estos son los cursos a los que te uniste</h1>
                            <div className="div-button-group">
                                <Button variant="contained" color="primary" onClick={() => { cambio("cc") }}>Cursos Creados</Button>
                                <Button variant="contained" color="secondary" onClick={() => { cambio("cu") }}>Cursos Unidos</Button>
                            </div>
                        </div>
                        {
                            coursesListJoined.length > 0 &&
                            <CourseContainer coursesList={coursesListJoined} />
                        }
                    </div>
            }
        </div>
    )
}

export default MyCourses
