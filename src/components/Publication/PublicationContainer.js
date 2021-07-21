import React, {useState, useEffect} from 'react'
import Publication from './Publication'

const PublicationContainer = ({publications}) => {

    const [publis, setPublis] = useState(publications)

    const onDelete = (idPublication) => {
        setPublis(publis.filter((p) => p._id !== idPublication))
    }

    useEffect(() => {
        setPublis(publications)
    }, [publications])

    return (
        <div>          
            
            <div style={{
                display: "flex",
                flexDirection: "column-reverse",
                padding: '0'
            }}>
                {
                    publis.map((publi, index) => (<Publication key={index} p={publi} onDelete={onDelete}/>))
                }
            </div>

        </div>
    )
}

export default PublicationContainer
