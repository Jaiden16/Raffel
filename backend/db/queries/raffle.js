const db = require('../db');

const getRaffles = async (req, res, next) => {
    try {
        const raffle = await db.any("SELECT * FROM raffles");
        res.json({
            raffle,
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



            let payload = await db.one(query,info)
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

module.exports = { getRaffles, postRaffle };