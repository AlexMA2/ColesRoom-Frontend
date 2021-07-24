import React, {useState, useEffect} from 'react'
import Publication from './Publication'

const PublicationContainer = ({publications, teacherId}) => {

    const [publis, setPublis] = useState(publications)
    const [viewControls, setViewControls] = useState(false)

    const onDelete = (idPublication) => {        
        console.log("=", idPublication)
        setPublis(publis.filter((p) => p._id !== idPublication))
        
    }

    useEffect(() => {
        setPublis(publications)
        const userid = sessionStorage.getItem("user")
        if (userid === teacherId) {
            setViewControls(true)
        }
        else {
            setViewControls(false)
        }
    }, [publications, teacherId])

    return (
        <div style={{width: '100%'}}>          
         
            <div style={{
                display: "flex",
                flexDirection: "column-reverse",
                padding: '0'
            }}>
                {
                    publis.map((publi) => (<Publication key={publi._id} p={publi} onDelete={onDelete} viewControls={viewControls}/>))
                }
            </div>

        </div>
    )
}

export default PublicationContainer
