import CourseContainer from '../../components/CourseContainer/CourseContainer'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core';
import './MyCourses.css'

const MyCourses = () => {

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [cambios, setcambios] = useState(false)


    const container = (maxwidth) => {
        return {
            "maxWidth": maxwidth + "rem",
            "width": "100%",
            "margin": "0 auto",
            "paddingTop": "20px"
        }
    }


    useEffect(() => {

    })

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
                                <Button variant="contained" color="primary" onClick={()=>{cambio("cc")}}>Cursos Creados</Button>
                                <Button variant="contained" color="secondary" onClick={()=>{cambio("cu")}}>Cursos Unidos</Button>
                            </div>
                        </div>
                        <CourseContainer valor="cc"></CourseContainer>
                    </div>
                    :
                    <div>
                        <div className="div-title-course">
                            <h1 style={{ "width": "70%" }}> Estos son los cursos a los que te uniste</h1>
                            <div className="div-button-group">
                            <Button variant="contained" color="primary" onClick={()=>{cambio("cc")}}>Cursos Creados</Button>
                            <Button variant="contained" color="secondary" onClick={()=>{cambio("cu")}}>Cursos Unidos</Button>
                            </div>
                        </div>
                        <CourseContainer valor="cu"></CourseContainer>
                    </div>
            }
        </div>
    )
}

export default MyCourses
