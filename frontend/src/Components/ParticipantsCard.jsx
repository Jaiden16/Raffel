import React from 'react'
import guy from "../images/guy.jpeg"
import '../CSS/participants.css'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faHashtag, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Card({participant}){

    
    return(
        <div className='card' style={{border:'1px solid black'}}>
            <div id='left'>
                <img id="pic"src ={guy} alt ="person" width='150'/>
            </div>
            <div id='right'>
                <p>{`${participant.firstname} ${participant.lastname}`}</p>
                <p><I icon={faHashtag}/>{participant.id}</p>
                <p><I icon={faEnvelope}/>{participant.email}</p>
                <p><I icon={faPhone}/>{participant.phone}</p>
            </div>

        </div>
    )
}