var express = require('express');
var router = express.Router();
var models = require('../models/models');
var Bets = models.Bet;
var Users = models.User;

router.get('/', function(req, res) {
    res.send('hello!!!!');
});

router.post('/register', function(req, res){
  new Users({
    facebookId: req.body.id,
    access_token: req.body.access_token,
    friends_list: req.body.friends_list,
    bets: [],
    name: req.body.name
  }).save((err, savedUser) => {
    console.log('User saved: ', savedUser);
    res.json(savedUser);
  })
})

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
        console.log('Found all them bets!', allBets);
        res.json(allBets);
    });
});

router.post('/myBets', function(req, res) {
    console.log(req.body.bettee);
    Bets.find({ $or: [{ bettor: req.body.bettor }, { bettee: req.body.bettee }]}, (err, myBets) => {
        if (err) {
            console.log('Oh my my an error: ', err);
        } else {
            console.log('All my bets in the haus: ', myBets);
            res.json(myBets);
        }
    });
});

router.post('/viewOneBet/:id', function(req, res) {
    console.log(req.params.id);
    Bets.findById(req.params.id, (err, bet) => {
        if (err) {
            console.log('Oh no an error: ', err);
        } else {
            console.log('That one bet was found hoorah: ', bet);
            res.json(bet);
        }
    });
});

router.post('/myPendingBets', function(req, res) {
    Bets.find({ pending: true }, (err, myPendingBets) => {
        if (err) {
            console.log('Oh my my an error: ', err);
        } else {
            console.log('Pending bets woot woot: ', myPendingBets);
            res.json(myPendingBets);
        }
    });
});

module.exports = router;
