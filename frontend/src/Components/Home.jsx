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
    const [searchTerm, setSearchTerm] = useState("")
    /*
        create a search a search box to filter what matches in the search box
        need a array to store the existing raffles
        possible filter the array based on what's in the search box
    
        for search function create a function that take in current array as an argument and stores it
        into a variable.
    
        filter the variable if searchTerm in not empty else if it is empty return original argument
    
    
    */

    /* 
        raffles that are still open color code green
        raffles that are closed light grey
        color the whole backgroud card either green or light gray

        check to see if raffles.winnerat property has a value and if so 
        change background color accordingly
    
    
    */

    /* 
        sort raffles based on which is available first and which is closed after

        create function where we pass array and push nowinners into front of the array
        and winners into back of the array
    
    */

    const sortWinners = (raffles) =>{
        let result = [];

        for(let i = 0; i < raffles.length; i ++){
            if(raffles[i].winner_id){
                result.push(raffles[i])
            }else{
                result.unshift(raffles[i])
            }
        }
        console.log("sort winners function", result)
        return result;
    }


    const filteredRaffles = (raffles) => {
        let filtered = [];

        if (searchTerm) {
            console.log(searchTerm)
            for (let i = 0; i < raffles.length; i++) {
                console.log(raffles[i].name)
                if (raffles[i].name.toLowerCase().includes(searchTerm)) {
                    filtered.push(raffles[i]);

                }

                console.log(raffles[i].name.includes(searchTerm))
            }
            console.log(filtered)
        }

        return (
            <ul style={{ listStyleType: "none" }}>
                {filtered.map(raffle => {
                    return <RaffleItem
                        key={raffle.id}
                        id={raffle.id}
                        name={raffle.name}
                        winner_id={raffle.winner_id}
                        raffled_at={raffle.raffled_at}
                    />
                })}

            </ul>

        );
    }

    const showRaffles = () => {
        return (
            <ul style={{ listStyleType: "none" }}>
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

        )
    }








    const getAllRaffles = async () => {
        let res = await axios({
            method: 'get',
            url: `/raffles`
        })
        let result = sortWinners(res.data.raffles)
        // console.log("line 135", result)
        setRaffles(result)
        
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

            <div>
                <h3>Search</h3>
                <div className="Search Field">
                    <TextField
                        required
                        id="outlined-required"
                        label="Search raffles"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }

                        }

                        placeholder="Search Field"
                        variant="outlined"
                    />
                </div>
            </div>

            <div id='raffles'>

                {searchTerm ? filteredRaffles(raffles) : showRaffles()}
            </div>
        </div>
    )

}