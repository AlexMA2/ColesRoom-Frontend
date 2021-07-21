import React, {useState, useEffect} from 'react'
import Publication from './Publication'

const PublicationContainer = ({publications}) => {

    const [publis, setPublis] = useState(publications)

    const onDelete = (idPublication) => {        
        console.log("=", idPublication)
        setPublis(publis.filter((p) => p._id !== idPublication))
        
    }

    useEffect(() => {
        setPublis(publications)
    }, [publications])

    return (
        <div>          
            {publis.map((publi, index) => (console.log(publi)))}
            <div style={{
                display: "flex",
                flexDirection: "column-reverse",
                padding: '0'
            }}>
                {
                    publis.map((publi) => (<Publication key={publi._id} p={publi} onDelete={onDelete}/>))
                }
            </div>

        </div>
    )
}

export default PublicationContainer
