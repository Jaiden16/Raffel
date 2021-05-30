const db = require('../db');

const getRaffles = async (req, res, next) => {
    try {
        const raffle = await db.any("SELECT * FROM raffles");
        res.json({
            data: raffle,
            message: 'success'
        }).status(200)

    } catch (err) {
        console.log(err);

    }
}

const postRaffle = async (req, res, next) => {
    let info = {};
    let query =
        "INSERT INTO raffles(name,secret_token,created_at) VALUES (${name},${secret},${time}) RETURNING *"
    let date = new Date();
    // console.log(date.toISOString())

    try {
        if (req.body.name) {
            info.name = req.body.name
        }

        if (req.body.secret) {
            info.secret = req.body.secret
        }

        if (req.body.name && req.body.secret) {
            info.time = date.toISOString()

            let payload = await db.one(query, info)
            console.log(payload);
            res.json({
                data: payload,
                message: "success"
            }).status(200)

        }

    } catch (err) {
        console.log(err)
    }
}

//get /raffles/:id - retrieve a single raffle by its id
const getSingleRaffle = async (req, res, next) => {
    try {
        let raffle = await db.oneOrNone(`SELECT * FROM raffles where id = ${req.params.id} `)
        res.json({
            data: raffle,
            message: 'retrieved raffle'
        }).status(200)

    } catch (err) {
        console.log(err)

    }
}





//get /raffles/:id/participants retrieve all participants of a raffle
const getRaffleParticipants = async(req,res,next) =>{
    let query = `SELECT firstname,lastname,email,phone,registered_at FROM raffles 
    JOIN users ON (users.raffle_id = ${req.params.id})`
    try{
        let users = await db.any(query)
        res.status(200).json({
            data: users,
            message: 'success'
        })

    }catch(err){
        console.log(err)
    }

}

//post /raffles/:id/participants sign up a participant to a raffle given a raffle id.
const postParticipant = async (req, res, next) => {
    let info = {};
    let date = new Date();
    let query = 'INSERT into users(raffle_id,firstname,lastname,email,phone,registered_at)'
    let values = 'VALUES(${id},${first},${last},${email},${phone},${registered})';
    let fullQuery = query + values + 'RETURNING *';
    try {
        if (req.body.first && req.body.last && req.body.email) {
            info.id = req.params.id
            info.first = req.body.first,
            info.last = req.body.last,
            info.email = req.body.email
        }

        if (req.body.phone) {
            info.phone = req.body.phone
            info.registered = date.toISOString()
        } else {
            info.phone = "n/a"
            info.registered = date.toISOString()

        }

        let payload = await db.one(fullQuery, info)
        res.json({
            data: payload,
            message: 'success'
        }).status(200)
    } catch (err) {
        res.json({
            data: "Email already used"
        })
        console.log(err)
    }
}


module.exports = { getRaffles, postRaffle, getSingleRaffle,getRaffleParticipants, postParticipant };