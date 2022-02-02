import axios from 'axios';
import React,{useEffect,useState} from 'react'
import NavBar from '../Components/NavBar'
import NoWinner from "../Components/NoWinner"
import IsWinner from "../Components/IsWinner"

export default function WinnerPage(props){
    const raffleId = props.match.params.id;
    const [raffleName,setRaffleName] = useState("")
    const [isWinner,setIsWinner] = useState("")
    
    const getSingleRaffle = async ()=>{
        let url =`/raffles/${raffleId}`
        let res = await axios.get(url)
        setRaffleName(res.data.raffle[0].name)
        setIsWinner(res.data.raffle[0].winner_id)
    }
    useEffect(()=>{
        getSingleRaffle()
    },[])
    console.log("winner containter", isWinner)
    
    return(
        <div>
            <h1>{raffleName}</h1>
            <NavBar id = {raffleId}/>
            {isWinner? <IsWinner id={raffleId}/>: <NoWinner id ={raffleId}/>}
        </div>
    )
}