import React, { useState, useEffect, useRef } from 'react'
import './CourseTitle.css'

import DefaultBackground from '../../imgs/CourseBackgroundDefault.jpg'
import CreateIcon from '@material-ui/icons/Create';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const CourseTitle = ({ name, description, date, backgroundImage }) => {

    const [dateFormat, setdateFormat] = useState('')
    const [editing, setediting] = useState(false)
    const [heightTitle, setheightTitle] = useState(0)
    const [heightContent, setheighContent] = useState(0)

    const [newTitle, setnewTitle] = useState('')
    const [newContent, setnewContent] = useState('')

    const titleRef = useRef();
    const contentRef = useRef();

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

            setdateFormat(df.format(dateTransform))
        }

    }, [date])

    const setStylesInputTitle = (newHeight) => {
        return {
            height: newHeight + 'px',
            width: '100%',
            fontSize: '2.25rem',
            fontWeight: 'bold',
            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
            background: 'none',
            color: '#fff',
            border: 'none',
            borderBottom: '1px solid #4f4f4f'
        }
    }

    const setStylesInputContent = (newHeight) => {
        return {
            height: (newHeight + 10) + 'px',
            width: '100%',
            fontSize: '1rem',                        
            background: 'none',
            color: '#fff',
            border: 'none',
            borderBottom: '1px solid #4f4f4f',
            paddingBottom: '0.5rem',
        }
    }

    const handleOpenEditCourse = (ev) => {       
        setheightTitle(titleRef.current.offsetHeight)   
        setnewTitle(name)  
        setheighContent(contentRef.current.offsetHeight)   
        setnewContent(description)
        titleRef.current.focus()
        setediting(true)
    }

    const handleCloseEditCourse = (ev) => {
        setediting(false)
    }

    const handleChangeTitle = (ev) => {
        setnewTitle(ev.target.value)
    }

    const handleChangeContent = (ev) => {
        setnewContent(ev.target.value)     
           
    }

    return (
        <div className="course-title" style={backgroundCourse}>
            <div className="course-title__info">
                <div className="course__subinfo">
                    {
                        editing 
                        ? <input type="text" value={newTitle} style={setStylesInputTitle(heightTitle)} onChange={handleChangeTitle}/>
                        : <h2 ref={titleRef}> {name} </h2>
                    }
                    <div>
                        {
                            editing 
                            ? <HighlightOffIcon onClick={handleCloseEditCourse} />
                            : <CreateIcon onClick={handleOpenEditCourse}/>
                        }
                       
                    </div>
                </div>
                <div className="course__description">
                    
                    <p> Creado el {dateFormat} </p>
                    {
                        editing 
                        ? <textarea style={setStylesInputContent(heightContent)} onChange={handleChangeContent}>{newContent}</textarea>
                        : <span ref={contentRef}>{description}</span>
                    }
                </div>
            </div>

        </div>
    )
}

export default CourseTitle
