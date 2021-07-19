import React, {useState} from 'react'
import DescriptionIcon from '@material-ui/icons/Description';

import 'draft-js/dist/Draft.css';

const Publication = ({p}) => {    

    return (
        <div className="publication">
            <div className="publication__content">
                {p.content}
            </div>
            <div className="publication__files">
                {p.route.map((path, index) =>
                    <div className="publication__file" key={index}>
                        <a href={path} target="_blank">{<DescriptionIcon fontSize="large"/>}</a>
                    </div>
                )}            
            </div>            
        </div>
    )
}

export default Publication
