var mongoose = require('mongoose')


var UsersSchema = mongoose.Schema({
	Roll_No : {type: String, index: true, unique: true},
	department : String,
	firstname : String,
	lastname : String,
});


var Users = mongoose.model('Users', UsersSchema);
module.exports = Users