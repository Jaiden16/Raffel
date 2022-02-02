import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import NavBar from './NavBar'
import Card from './ParticipantsCard'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));
export default function RaffleParticipants(props) {
    const classes = useStyles();
    const raffleId = props.match.params.id;
    const [raffleName, setRaffleName] = useState("")
    const [participants, setParticipants] = useState([])
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [userEmail, setEmail] = useState("");
    // const [phone, setPhone] = useState("");

    const getSingleRaffle = async () => {
        let url = `/raffles/${raffleId}`
        let res = await axios.get(url)
        console.log(res)
        setRaffleName(res.data.raffle[0].name)
    }
    
    const getRaffleParticipants = async () => {
        let url = `/raffles/${raffleId}/participants`
        let res = await axios.get(url)
        console.log('line40', res)
        console.log("Set")
        setParticipants(res.data.participants)
        
    }
    
    
    useEffect(() => {
        getSingleRaffle();
        getRaffleParticipants();

    }, [])





    console.log("participants array ",participants)
    return (
        <div >
            <h1>{raffleName} Participants</h1>
            <NavBar id={raffleId} />

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {participants.map(participant => {
                    return <Card key={participant.id}
                        participant={participant} />

                })}
            </div>


        </div >
    )
}