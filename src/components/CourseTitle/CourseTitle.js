import React, { useState, useEffect } from 'react'
import './CourseTitle.css'

import DefaultBackground from '../../imgs/CourseBackgroundDefault.jpg'
import CreateIcon from '@material-ui/icons/Create';

const CourseTitle = ({ name, description, date, backgroundImage }) => {

    const [dateFormat, setdateFormat] = useState('')

    const backgroundCourse = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `url(${DefaultBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        left: 0,
        top: 0,
        borderRadius: '1rem'
    }

    useEffect(() => {
        if (date) {
            const df = new Intl.DateTimeFormat('es', { dateStyle: 'full', timeStyle: 'long' })
            const dateToFormat = new Date(date)
            const dateTransform = new Date(Date.UTC(
                dateToFormat.getFullYear(),
                dateToFormat.getMonth(),
                dateToFormat.getDate(),
                dateToFormat.getUTCHours(),
                dateToFormat.getUTCMinutes(),
                dateToFormat.getUTCSeconds()));
            
            setdateFormat(df.format(dateTransform) )
        }

    }, [date])

    return (
        <div className="course-title" style={backgroundCourse}>
            <div className="course-title__info">
                <div className="course__subinfo">
                    <h2 > {name} </h2>
                    <div>
                        <CreateIcon />
                    </div>                    
                </div>
                <div className="course__description">
                    <p> Creado el {dateFormat} </p>
                    {description}
                </div>
            </div>

        </div>
    )
}

export default CourseTitle
