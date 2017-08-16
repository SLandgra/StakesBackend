var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Bets = models.Bet;
var Users = models.User;

router.get('/', function(req, res) {
    res.send('HEY BABES');
});

router.post('/createBet', function(req, res) {
    new Bets({
        wager: req.body.wager,
        content: req.body.content,
        pending: true,
        alreadyWon: false,
    }).save((err, savedBet) => {
        console.log('Bet saved: ', savedBet);
        res.json(savedBet);
    })
});

module.exports = router;
