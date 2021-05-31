import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faRegistered, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons'
import '../CSS/NavBar.css'

export default function NavBar() {
    return (
        <ul className='nav-list'>
            <li id='nav-item'>
                <div stye={{size:"100%"}}>
                    <Link to='/'><I icon={faTicketAlt} /><p>Home</p></Link>
                </div>
            </li>
            <li id='nav-item'><Link id="Home"><I icon={faRegistered} /><p>Register</p></Link></li>
            <li id='nav-item'><Link id="Home"><I icon={faUsers} /><p>Participants</p></Link></li>
            <li id='nav-item'><Link id="Home"><I icon={faTrophy} /><p>Pick Winner</p></Link></li>

        </ul>
    )

}
