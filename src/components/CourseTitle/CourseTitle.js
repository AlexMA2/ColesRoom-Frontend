import React, { useRef, useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import UILink from '@material-ui/core/Link';
import './CourseTitle.css'

const CourseTitle = ({ name, description, date, photo, backgroundImage, teacher }) => {

    const slideIMG = useRef()
    const slideDesc = useRef()

    const [show, setshow] = useState(0)

    const BG = import(backgroundImage)
    
    const handleClick = (ev) => {
        if (show === 0) {
            slideIMG.current.style.width = "0"
            slideDesc.current.style.width = "100%"
            setshow(1)
        }
        else if (show === 1) {
            slideDesc.current.style.width = "0"
            slideIMG.current.style.width = "100%"
            setshow(0)
        }
    }


    return (
        <div className="course-title">
            <div className="course-title__info">
                <div className="course__subinfo">
                    <h2 > {name} </h2>
                    <p> Creado el {date} </p>
                </div>
                <div className="course-title__teacher">
                    <Avatar alt="profesor_photo" src={photo} />
                    <p> {teacher} </p>
                </div>
                <div>
                    <UILink
                        component="button"
                        variant="body2"
                        onClick={handleClick}
                    >
                        Ver descripci&oacute;n del curso
                    </UILink>
                </div>
            </div>
            <div className="course-title__extra">
                <div className="bgimage" style={{width: "100%"}} ref={slideIMG}>
                    {console.log(BG)}
                    <img src={BG} alt="bg_image"></img>
                </div>
                <div className="descrip" ref={slideDesc}>
                    {description}
                </div>
            </div>
        </div>
    )
}

export default CourseTitle
