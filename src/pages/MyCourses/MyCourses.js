import CourseContainer from '../../components/CourseContainer/CourseContainer'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom'

const MyCourses = () => {

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)


    const container = (maxwidth) => {
        return {
            "maxWidth": maxwidth + "rem",
            "width": "100%",
            "margin": "0 auto",
            "paddingTop": "20px"
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div style={container(75)}>
            {
                // usuario === null &&
                // <Redirect to="/"/>
            }
            <h1> Tus cursos </h1>
            {
                loading
                    ? <CircularProgress size={100} className="center-block" />
                    : <CourseContainer coursesList={courses}></CourseContainer>
            }
        </div>
    )
}

export default MyCourses
