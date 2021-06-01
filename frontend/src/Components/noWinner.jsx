import React, { useState } from 'react'
import {useHistory} from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import { Button } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

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


export default function NoWinner(props) {
    const classes = useStyles();
    const id = props.id
    const history = useHistory()
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("")
    const HandleSubmit = async (e) => {
        e.preventDefault()
        try {
            let body = { token: token }
            let url = `/raffles/${id}/winner`
            let res = await axios.put(url, body)
            console.log(res)
            console.log(res.data.response.message)
            if (res.data.response.message === "invalid token") {
                // throw(error)
                setMessage("Wrong Token")
            }else{
                console.log('push')
                history.push(`/raffles/${id}/winner`)
            }

        } catch (err) {
            // setMessage("Wrong Token")

        }
    }

    if (message) {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }



    console.log(id)
    return (
        <div>
            <div className={classes.root}>
                <form onSubmit={HandleSubmit}>
                    <h2>Pick A Winner</h2>
                    <div className="Fields" style={{ margin: 10, alignSelf: "center", justifyContent: 'center' }}>
                        <TextField
                            label="Token"
                            id="standard-full-width"
                            style={{ margin: 10 }}
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Secret Token"
                            helperText="Must use secret Token Used when creating the raffle"
                            fullWidth
                            required
                            margin="dense"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >Submit</Button>
                    </div>
                    {message ? <p>{message}</p> : null}
                </form>
            </div>

        </div>
    )
}