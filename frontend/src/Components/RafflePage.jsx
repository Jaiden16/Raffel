import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import NavBar from './NavBar'

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
export default function RafflePage(props) {
    const classes = useStyles();
    const raffleId = props.match.params.id;
    const [raffleName, setRaffleName] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const getSingleRaffle = async () => {
        let url = `/raffles/${raffleId}`
        let res = await axios(url)
        setRaffleName(res.data.raffle[0].name)
    }

    useEffect(() => {
        getSingleRaffle();

    }, [])

    const HandleSubmit = () => {

    }




    return (
        <div >
            <h1>{raffleName}</h1>
            <NavBar />
            <div className={classes.root}>
                <form onSubmit={HandleSubmit}>
                    <h2>Register to Participate in Raffle</h2>
                    <div className="Fields" style={{ margin: 10, alignSelf: "center", justifyContent: 'center' }}>
                        <TextField
                            label="First Name"
                            id="margin-none"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            className={classes.textField}
                            required
                            helperText="Required"
                        />
                        <TextField
                            label="Last Name"
                            id="margin-none"
                            placeholder='First Name'
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            className={classes.textField}
                            required
                            helperText="Required"
                        />

                        {/* <TextField
                            label="First Name"
                            id="standard-full-width"
                            style={{ margin: 10 }}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            helperText="Required"
                            fullWidth
                            required
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Last Name"
                            id="standard-full-width"
                            style={{ margin: 10 }}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            helperText="Required"
                            fullWidth
                            required
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}


                        <TextField
                            label="Email"
                            type="email"
                            id="standard-full-width"
                            style={{ margin: 10 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email@domain.com"
                            helperText="Required"
                            fullWidth
                            required
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Phone Number"
                            id="standard-full-width"
                            style={{ margin: 8 }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="xxx-xxx-xxxx"
                            helperText="Optional!"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    {/* {message ? <p>{message}</p> : null} */}
                    <Button variant="contained" color="primary">Submit</Button>
                    <Button variant="contained" color="seconday">Reset</Button>
                </form>
            </div>

        </div>
    )
}