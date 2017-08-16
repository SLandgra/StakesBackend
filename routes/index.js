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
        bettor: req.body.bettor,
        bettee: req.body.bettee,
        pending: true,
        alreadyWon: false,
    }).save((err, savedBet) => {
        console.log('Bet saved: ', savedBet);
        res.json(savedBet);
    })
});

router.post('/feed', function(req, res) {
    Bets.find((err, allBets) => {
        res.json(allBets);
    });
});

router.post('/myBets', function(req, res) {
    console.log(req.body.bettee);
    Bets.find({ $or: [{ bettor: req.body.bettor }, { bettee: req.body.bettee }]}, (err, myBets) => {
        res.json(myBets);
    });
});

router.post('/viewOneBet/:id', function(req, res) {

});




router.post('/myPendingBets', function(req, res) {

});

module.exports = router;
