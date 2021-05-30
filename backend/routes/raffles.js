const express = require('express');
const { get } = require('.');
const router = express.Router();
const {getRaffles, postRaffle, getSingleRaffle, postParticipant, getRaffleParticipants} = require("../db/queries/raffle");


router.get('/raffles',getRaffles);
router.post('/raffles',postRaffle);
router.get('/raffles/:id',getSingleRaffle)
router.post('/raffles/:id/participants',postParticipant)
router.get('/raffles/:id/participants',getRaffleParticipants)

module.exports = router;