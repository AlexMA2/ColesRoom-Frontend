import React, { useState, useEffect, useRef } from 'react'
import './CourseTitle.css'

import DefaultBackground1 from '../../imgs/CourseBackground1.jpg'
import DefaultBackground2 from '../../imgs/CourseBackground2.jpg'
import DefaultBackground3 from '../../imgs/CourseBackground3.jpg'

import CreateIcon from '@material-ui/icons/Create';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Switch from '@material-ui/core/Switch';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const CourseTitle = ({ name, description, date, backgroundImage, category, topic }) => {

    const [dateFormat, setdateFormat] = useState('')
    const [editing, setediting] = useState(false)
    const [heightTitle, setheightTitle] = useState(0)
    
    const [newTitle, setnewTitle] = useState(name)
    const [newContent, setnewContent] = useState(description)    

    const [visibility, setvisibility] = useState(category)
    const [visibilityText, setvisibilityText] = useState(category ? 'Público' : 'Privado')

    const [fondo, setfondo] = useState(backgroundImage)
    const [background, setbackground] = useState(DefaultBackground1)

    const titleRef = useRef();  

    const backgroundCourse = {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        left: 0,
        top: 0,
        borderRadius: '1rem',
        height: editing ? '30rem' : 'auto',
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

    const setStylesInputContent = () => {
        return {
            height: '99%',
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

    const handleChangeSwitch = () => {
        setvisibility(!visibility)
        setvisibilityText(visibility ? 'Público' : 'Privado')
    }

    const handleChooseBackground = (ev) => {
        setfondo(ev.target.value)
        selectBackground(ev.target.value)        
    }

    const selectBackground = (value) => {
        switch (value) {
            case 'f1':
                setbackground(DefaultBackground1)
                break
            case 'f2':
                setbackground(DefaultBackground2)
                break
            case 'f3':
                setbackground(DefaultBackground3)
                break
            default:
                setbackground(DefaultBackground1)
                break
        }
    }

    const saveChanges = () => {
        if (newTitle !== '' && newContent !== '') {
            setediting(false)     
            fetch(`/api/courses/${topic}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newTitle,         
                    description: newContent,           
                    image: fondo,                    
                    category: visibility,                   
                }),            

            })       
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data) {                                                                               
                       
                        setediting(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                })              
        }
    }

    useEffect(() => {
        setvisibility(category)
        setvisibilityText(visibility ? 'Público' : 'Privado')     
        setfondo(backgroundImage)               
        setnewContent(description)
        setnewTitle(name)   
    }, [category, backgroundImage, description, name])

    useEffect(() => {
        selectBackground(fondo)
    }, [fondo])

    return (
        <div className="course-title" style={backgroundCourse}>
            <div className="course-title__info">
                <div className="course__subinfo">
                    {
                        editing
                            ? <input type="text" value={newTitle} style={setStylesInputTitle(heightTitle)} onChange={handleChangeTitle} />
                            : <h2 ref={titleRef}> {newTitle} </h2>
                    }
                    <div>
                        {
                            editing
                                ? <HighlightOffIcon onClick={handleCloseEditCourse} />
                                : <CreateIcon onClick={handleOpenEditCourse} />
                        }

                    </div>
                </div>
                <div className="course__description">

                    <p> Creado el {dateFormat} </p>
                    {
                        editing
                            ? <textarea style={setStylesInputContent()} onChange={handleChangeContent}>{newContent}</textarea>
                            : <span >{newContent}</span>
                    }
                </div>
                {
                    editing
                        ?
                        <div className="course-title--edit">
                            <div className="course-title--edit__category"> 
                                <p> Categor&iacute;a:</p>
                                <Switch
                                    checked={visibility}
                                    onChange={handleChangeSwitch}
                                    name="checked"
                                    color="primary"
                                />
                                <p className="course-title--edit__visibility"> {visibilityText} </p>
                            </div>
                            <div className="course-title--edit__background">
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" style={{color: '#ffffff', fontSize:'1rem'}}> Elije el fondo: </FormLabel>
                                    <RadioGroup aria-label="fondo" name="fondo" value={fondo} onChange={handleChooseBackground} style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormControlLabel value="f1" control={<Radio />} label="Fondo 1" />
                                        <FormControlLabel value="f2" control={<Radio />} label="Fondo 2" />
                                        <FormControlLabel value="f3" control={<Radio />} label="Fondo 3" />                                       
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Button variant="contained" color="primary" onClick={saveChanges}> Guardar Cambios </Button>
                            </div>
                        </div>

                        : null
                }
            </div>

        </div>
    )
}

export default CourseTitle
