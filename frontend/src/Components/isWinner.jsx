import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import { Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import WinnerCard from './WinnerCard'

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


export default function IsWinner(props) {
    const id = props.id
    const [token, setToken] = useState("")
    const [info,setInfo] = useState([])
    console.log(id)

    const getSingleRaffle = async () => {
        try {
            let url = `/raffles/${id}`
            let res = await axios.get(url)
            console.log(res.data.raffle[0].secret_token)
            console.log(res)
            setToken(res.data.raffle[0].secret_token)

        } catch (err) {
            console.log(err)
        }

    }
    const getWinner = async () => {
        console.log('second')
        try{
            let body = { token:token }
            console.log(body)
            let url = `/raffles/${id}/winner`
            let res = await axios.put(url, body)
            console.log('48',res.data.data)
            setInfo(res.data.data)

        }catch(err){
            console.log(err)

        }

    }
    if(token){
        console.log('first')
        console.log(token)
        getWinner()
        setToken("")
        
    }

    useEffect(() => {
        getSingleRaffle()
        // getWinner()

    }, [])


    return (
        <div>
            <h1>Winner</h1>
            <WinnerCard 
            firstname = {info.firstname}
            lastname= {info.lastname}
            id ={info.id}
            email ={info.email}
            phone ={info.phone}/>

        </div>
    )
}