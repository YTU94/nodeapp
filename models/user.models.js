var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);
module.exports = User;