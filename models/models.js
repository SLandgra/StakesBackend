var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!

var userSchema = mongoose.Schema({
  facebookId: String,
  access_token: String,
  refresh_token: String,
  friends_list: Array,
  bets: Array,
  name: String
});

var betSchema = mongoose.Schema({
  wager: String,
  content: String,
  comments: [{
      text: String,
      postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
  }],
  bettor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  bettee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  votes: {
      bettor: Array,
      bettee: Array
  },
  likes: [{
      text: String,
      postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }
  }],
  pending: Boolean,
  alreadyWon: Boolean
});

//
// userSchema.statics.findOrCreate = function(specification, extras, callback) {
//  User.findOne(specification, function(error, foundUsers) {
//    if (error) {
//      callback(error);
//    } else if (!foundUsers) {
//      var object = Object.assign(specification, extras);
//      var user = new User(object);
//      console.log('Created User:')
//      console.log(user);
//      user.save(callback(error, user))
//    } else {
//      console.log('Found User:');
//      console.log(foundUsers);
//      callback(null, foundUsers)
//    }
//  })
// }


// Step 2: Create all of your models here, as properties.
var User = mongoose.model('User', userSchema);
var Bet = mongoose.model('Bet', betSchema)
// Step 3: Export your models object
module.exports = {
    User: User,
    Bet: Bet,
};
