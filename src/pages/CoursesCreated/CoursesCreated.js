import React, { useEffect } from 'react'
const CoursesCreated = () => {


    useEffect(()=>{
        console.log ("componete fue montado")
        fectchTask()
    
    })

    const fectchTask = () => {
        fetch('/courses')
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        
        <div>
            HOLAS
        </div>
    )
}

export default CoursesCreated
