import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import RaffleItem from './RaffleItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function Home() {
    const classes = useStyles();
    const [raffles, setRaffles] = useState([]);
    const [raffleName, setRaffleName] = useState("");
    const [raffleToken, setRaffleToken] = useState("");
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const getAllRaffles = async () => {
        let res = await axios({
            method: 'get',
            url: `/raffles`
        })
        setRaffles(res.data.raffles)
        console.log(res.data.raffles)
    }

    useEffect(() => {
        getAllRaffles()

    }, [])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = { name: raffleName, secret: raffleToken };
            let url = '/raffles';
            await axios.post(url, res)
            setRaffleToken("")
            setRaffleName("")
            setMessage("Raffle Added")
            getAllRaffles()

        } catch (err) {
            setError(err.message);
        }
    }
    if (message) {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }

    return (
        <div className={classes.root}>
            <div id='form'>
                <form onSubmit={HandleSubmit}>
                    <h2>NEW RAFFLE</h2>
                    <div className="Fields">
                        <div className="Raffle-Name">
                            <TextField
                                required
                                id="outlined-required"
                                label="Raffle Name Required"
                                value={raffleName}
                                onChange={(e) => setRaffleName(e.target.value)}
                                placeholder="Raffle Name"
                                variant="outlined"
                            />
                        </div>
                        <div className="Raffle-Token">
                            <TextField
                                required
                                id="outlined-required"
                                label="Secret Token Required"
                                value={raffleToken}
                                onChange={(e) => setRaffleToken(e.target.value)}
                                placeholder="Raffle Token"
                                variant="outlined"
                            />
                        </div>
                        <p>You Must Remember the Raffle Token because it will be asked when picking a winner</p>
                    </div>
                    {message ? <p>{message}</p> : null}
                    <button type="submit">CREATE NEW RAFFLE</button>
                </form>
            </div>

            <div id='raffles'>
                <ul style={{listStyleType:"none"}}>
                    {raffles.map(raffle => {
                        return <RaffleItem
                            key={raffle.id}
                            id={raffle.id}
                            name={raffle.name}
                            winner_id={raffle.winner_id}
                            raffled_at={raffle.raffled_at}
                        />
                    })}

                </ul>
            </div>
        </div>
    )

}