var mongoose = require('mongoose')


var UsersSchema = mongoose.Schema({
	Roll_No : {type: Number, index: true, unique: true, min: 100000000, max: 999999999},
	department : String,
	firstname : String,
	lastname : String,
});


var Users = mongoose.model('Users', UsersSchema);
module.exports = Users