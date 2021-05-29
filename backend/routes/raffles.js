const express = require('express');
const { get } = require('.');
const router = express.Router();
const {getRaffles, postRaffle} = require("../db/queries/raffle");


router.get('/raffles',getRaffles);
router.post('/raffles',postRaffle)

module.exports = router;