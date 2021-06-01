import React, {useEffect} from 'react'
import guy from "../images/guy.jpeg"
import '../CSS/WinnerCard.css'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faHashtag, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"

export default function Card(props) {
    


    // console.log(raffleId)
    return (
        <div className='card' style={{ border: '1px solid black' }}>
            <div id='top'>
                <img id="pic" src={guy} alt="person" width='150' />
            </div>
            <div id='right'>
                <p>{`${props.firstname} ${props.lastname}`}</p>
                <p><I icon={faHashtag}/>{props.id}</p>
                <p><I icon={faEnvelope}/>{props.email}</p>
                <p><I icon={faPhone}/>{props.phone}</p>
            </div>

        </div>
    )
}