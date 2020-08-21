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
			var val= fn.slice(0,3);
			var dept;
			if(val!=111){
				//mech
				if(val!=103){
					//civil
					if(val!=112){
						//meta
						if(val!=106){
							//cs
							if(val!=110){
								//ice
								if(val!=102){
									//chemical
									if(val!=107){
										//eee
										if(val!=108){
											//ece
											if(val!=114){
												//prod
											if(val!=101){
												//archi
												res.render(searchdept,{msg: "The department for this roll no. is not available!"});
												return;
											}
											else dept="Architecture";
											}
											else dept="Production Engineering";
										}
										else dept ="Electronics and Communication Engineering";
									}
									else dept= "Electrical and Electronics Engineering";
								}
								else dept= "Chemical Engineering";
							}
							else dept= "Instrumentation and Control Engineering";
						}
						else dept="Computer Science and Engineering";
					}
					else dept= "Metallurgical and Materials Engineering";
				}
				else dept="Civil Engineering";
			}
			else dept= "Mechanical Engineering";
			res.render("searchform",{ roll: " Roll No.:- "+user._doc.Roll_No,name: " Name:- "+user._doc.firstname+" " +user._doc.lastname,dept: " Department:- "+dept})
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
	if(rollno.length!=9){
		res.render('searchdept',{msg: "The Roll No. entered should be 9 digits!"});
		return;
	}
	var dept;
	var val=rollno.slice(0,3);
	if(val!=111){
		//mech
		if(val!=103){
			//civil
			if(val!=112){
				//meta
				if(val!=106){
					//cs
					if(val!=110){
						//ice
						if(val!=102){
							//chemical
							if(val!=107){
								//eee
								if(val!=108){
									//ece
									if(val!=114){
										//prod
                                    if(val!=101){
										//archi
										res.render(searchdept,{msg: "The department for this roll no. is not available!"});
										return;
									}
									else dept="Architecture";
									}
									else dept="Production Engineering";
								}
								else dept ="Electronics and Communication Engineering";
							}
							else dept= "Electrical and Electronics Engineering";
						}
						else dept= "Chemical Engineering";
					}
					else dept= "Instrumentation and Control Engineering";
				}
				else dept="Computer Science and Engineering";
			}
			else dept= "Metallurgical and Materials Engineering";
		}
		else dept="Civil Engineering";
	}
	else dept= "Mechanical Engineering";
	   res.render('searchdept',{ msg: "The department of Roll No." +rollno+" is " +dept+"."})

    
})


/* GET registration form */
router.get('/registerform', function(req, res, next){
	res.render('registerform', { title: 'Welcome to NITT Search Portal!!' });
})
router.get('/searchform', function(req, res, next){
	res.render('searchform');
})
router.get('/searchdept', function(req, res, next){
	res.render('searchdept');
})


router.get('/register',function(req,res){
	res.redirect('/');
})


/* POST registeration */
router.post('/register', function(req, res){
	var rollno = req.body.rollno;
	var roll=req.body.rollno;
	//roll=parseInt(roll);
	if(rollno.length!=9){
		
		res.render('registerform',{ msg: "This Roll No. is not 9-digits, put correct roll no."})
	 return;
	}

	
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var newUser = new User();
	newUser.Roll_No = rollno;
	
	newUser.firstname = firstname;
	newUser.lastname = lastname;

	newUser.save(function(err, savedUser){
		if (err){
			console.log(err);
			res.render('registerform',{msg: "This Roll No. cannot be registered"});
		}
		console.log(savedUser);
	
		return res.status(200).render("index", {title: "Registered Successfully"});
    });





});
module.exports = router;
