var express = require('express');
var router = express.Router();
var User = require('../lib/users');
const user=new User;




router.get('/', function(req, res, next) {
	
	res.render('index', { title: 'Welcome to NITT Search Portal!!',msg:'' });
	
});
router.post('/search',function(req,res){
	field=req.body.searchbar;
	i=field.indexOf(" ");
	//console.log(i);
	var fn=field.slice(0,i);
	var ln=field.slice(i+1,field.length);
	//console.log(fn,ln);
	User.findOne({Roll_No: fn},function(err,user){
        if(err){
			console.log(err);

		}
		else{
			res.render("index",{title: "Welcome to NITT search portal!!", msg: "Roll No.:- "+user._doc.Roll_No+ " Name:- "+user._doc.firstname+" " +user._doc.lastname+ " Department:- "+ user._doc.department})
		}
	})
})
router.get('/autocomplete',function(req,res,next){
	//console.log(data);
	var regex = new RegExp(req.query["term"],'i');
	var user=User.find({Roll_No: regex}).sort({"updated_at":-1}).sort({"created":-1});
	user.exec(function(err,data){
		//console.log(data);
		var arr=[]
		if(err){
			console.log(err);
		}
		if(data){
			data.forEach(user1 => {
				let obj={
					id: user1._id,
					label: user1.Roll_No+" "+ user1.firstname+" "+user1.lastname
				}
				arr.push(obj);
			});
			var user2=User.find({firstname: regex}).sort({"updated_at":-1}).sort({"created":-1});
			user2.exec(function(err,data1){
				//console.log(data1);
				if(err){
					console.log(err);
				}
				if(data1){
					data1.forEach(user2=>{
						let obj={
							if: user2._id,
							label:user2.Roll_No+" "+ user2.firstname+" "+user2.lastname
						}
						arr.push(obj);
					})
				}
			});
			var user3=User.find({lastname: regex}).sort({"updated_at":-1}).sort({"created":-1});
			user3.exec(function(err,data1){
				//console.log(data1);
				if(err){
					console.log(err);
				}
				if(data1){
					data1.forEach(user3=>{
						let obj={
							if: user3._id,
							label:user3.Roll_No+" "+ user3.firstname+" "+user3.lastname
						}
						arr.push(obj);
					})
					res.jsonp(arr);
				}
			});
			
		}
	})
})
router.get('/dept',function(req,res){
	res.redirect('/');
})
router.post('/dept', function(req,res){
    var rollno= req.body.searchdept;
	
	var dept;
	
    User.findOne({Roll_No: rollno},(err,dept)=>{
        if(err){
            console.log(err);
            res.redirect('/');
            return;
		}
		if(!dept){
			res.render('index',{title: 'Welcome to NITT search portal!!' , msg1: "This record does not exist, check for correct Roll No.",msg: ""})
		return;
		}
	   dept=dept._doc.department;
	   //console.log("dept", dept);
	   res.render('index',{title: 'Welcome to NITT search portal!!' , msg1: "The department of Roll No." +rollno+" is " +dept+ "",msg: "", rollno: rollno})
    })
    
})


/* GET registration form */
router.get('/registerform', function(req, res, next){
	res.render('registerform', { title: 'Welcome to NITT Search Portal!!' });
})


router.get('/register',function(req,res){
	res.redirect('/');
})


/* POST registeration */
router.post('/register', function(req, res){
	var rollno = req.body.rollno;
	var roll=req.body.rollno;
	roll=parseInt(roll);
	if(roll<111111111||roll>999999999){
		
		res.render('index',{title:"Welcome to NITT Search Portal", msg: "This Roll No. is not 9-digits, put correct roll no."})
	 return;
	}

	var department = req.body.department;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var newUser = new User();
	newUser.Roll_No = rollno;
	newUser.department = department;
	newUser.firstname = firstname;
	newUser.lastname = lastname;

	newUser.save(function(err, savedUser){
		if (err){
			console.log(err);
			res.render('registerform',{title:"Welcome to NITT search portal",msg: "This Roll No. cannot be registered"});
		}
		console.log(savedUser);
	
		return res.status(200).render("index", {title: 'Welcome to NITT search portal!!' ,msg1:"", msg: "Registered Successfully"});
    });





});
module.exports = router;
