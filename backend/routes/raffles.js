const express = require('express');
const router = express.Router();
const {getRaffles, postRaffle, getSingleRaffle, postParticipant, getRaffleParticipants, pickWinner} = require("../db/queries/raffle");


router.get('/raffles',getRaffles);
router.post('/raffles',postRaffle);
router.get('/raffles/:id',getSingleRaffle)
router.get('/raffles/:id/participants',getRaffleParticipants)
router.post('/raffles/:id/participants',postParticipant)
router.put('/raffles/:id/winner',pickWinner)


module.exports = router;