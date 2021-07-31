import Course from "../Course/Course.js"
import './CourseContainer.css'
import '../../utils.css'
import React, { Component } from 'react'

import './CourseContainer.css'
import '../../utils.css'

import { useSelector } from 'react-redux'

const CourseContainer = ({ coursesList }) => {
    const search = useSelector(state => state.search)   

    const condition = (co) => (co.name.toLowerCase().startsWith(search.toLowerCase()))

    return (
        <div className="course-container">

            <div className="grid-courses">
                {
                    coursesList.filter(condition).length > 0
                        ? coursesList.filter(condition).map((co) => (<Course                          
                          key={co._id}
                          curso_id={co._id}
                          name={co.name}
                          category={co.category}
                          teacher_id={co.user_id}
                          description={co.description}
                          imagen={co.description}
                          image={co.image}
                          datecreate={co.datecreate}            
                          viewDelete={true} />))
                        : <h2> No hay cursos </h2>
                }

            </div>
        </div>

    )
}

CourseContainer.defaultProps = {   
    coursesList: []
}


export default CourseContainer