import React from 'react'
import Publication from './Publication'

const PublicationContainer = ({publications}) => {
    return (
        <div>
            <ul style={{
                display: "flex",
                flexDirection: "column-reverse"
            }}>
                {
                    publications.map((publi, index) => (<Publication key={index} p={publi}/>))
                }
            </ul>

        </div>
    )
}

export default PublicationContainer
