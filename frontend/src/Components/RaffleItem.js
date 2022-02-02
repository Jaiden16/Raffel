import React from 'react';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome'
import { faTrophy, faCalendar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import "../CSS/item.css"
import { Link } from 'react-router-dom'

export default function RaffleItem(props) {

    //create the variable to pass in inline style
    //check passed props value to change color accordingly
    let bgColor = "green";

    if(props.winner_id){
        bgColor = "grey"
    }


    return (
        <Link to={`/raffles/${props.id}`}  >
            <li className="list" key={props.id} style={{background:`${bgColor}`}} >
                <div>
                    <h3><Fa icon={faCalendar} />{props.name}</h3>
                    <p><Fa icon={faTrophy} /> Winner id: {props.winner_id}</p>
                    <p><Fa icon={faCalendarCheck} />Raffled At: {props.raffled_at}</p>
                </div>
            </li>
        </Link>

    )
}
