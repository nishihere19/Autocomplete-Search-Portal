var express = require('express');
var router = express.Router();
var User = require('../lib/users');
const user=new User;




router.get('/', function(req, res, next) {
	
	res.render('index', { title: 'Welcome to NITT Search Portal!!',msg:'' });
	
});

router.post('/dept', function(req,res){
    var rollno= req.body.searchdept;
    console.log("dept", rollno);
    var dept;
    User.findOne({Roll_No: rollno},(err,dept)=>{
        if(err){
            console.log(err);
            res.redirect('/');
            return;
        }
	   dept=dept._doc.department;
	   console.log("dept", dept);
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
router.get('/autocomplete',function(req,res,next){
	console.log(data);
	var regex = new RegExp(req.query["term"],'i');
	var user=User.find({Roll_No: regex},{'Roll_No':1}).sort({"updated_at":-1}).sort({"created":-1});
	user.exec(function(err,data){
		console.log(data);
		var arr=[]
		if(err){
			console.log(err);
		}
		if(data){
			data.forEach(user1 => {
				let obj={
					id: user1._id,
					label: user1.firstname+" "+user1.lastname
				}
				arr.push(obj);
			});
			res.jsonp(arr);
		}
	})
})




});
module.exports = router;
