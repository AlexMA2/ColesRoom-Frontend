import React from 'react'

import './Banner.css'

import { Button } from '@material-ui/core'

import { Redirect, useHistory } from 'react-router'

import {useState} from 'react'

const Banner = ({imgBanner, redir, textButton, title, paragraph}) => {

    const history = useHistory()

    const [click, setclick] = useState(false)

    const handleClick = (e) => {
        history.push(redir)
        setclick(true)
    }

    return (
        <div className="banner">
            {
                click &&
                <Redirect to={redir}/>
            }
            <div className="banner_img-container">
                <img src={imgBanner} alt="banner-portada" />
            </div>
            <div className="banner_info-container">
                <div className="banner_info-title">
                    {title[0]}
                    <div className="flip">
                        <div>
                            <div>{title[1]}</div>
                        </div>
                        <div>
                            <div>{title[2]}</div>
                        </div>
                        <div>
                            <div>{title[3]}</div>
                        </div>
                    </div>
                </div>
                <p> {paragraph} </p>
                <Button variant="contained" size="medium" color="secondary" onClick={handleClick}>
                    {textButton}
                </Button>
            </div>
        </div>
    )
}

export default Banner
