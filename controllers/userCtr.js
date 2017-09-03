var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');


var User = require('../models/userModel');
var config = require('../config/connections');
var router = express.Router();

//register
router.post('/register', function(req,res, next){
	var newUser  = new User({
		name:req.body.name,
		username:req.body.username,
		password:req.body.password
	});
	console.log(newUser);

User.getUserByUsername(newUser.username, function(err, user){
	if(err) throw err;
	if(!user){
			User.addUser(newUser,function(err,user){
		if(err){
			res.json({success:false, msg:"Failed to Register user"});
		}else{
			res.json({success:true, msg:"Success the User is Register"});
		}
	});
		}else{
		res.json({success:false, msg:"Failed to Register user already exist"});		}
})



});

//authenticate
router.post('/authenticate', function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	User.getUserByUsername(username, function(err, user){
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg:"User not found"});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
		if(err) throw err;
		if(isMatch){
			var token = jwt.sign(user, config.secret, {
			expiresIn: 604800 // 1 week seconds
			});

			res.json({
				success:true,
				token:'JWT '+ token,
				user:{
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email
				}
			});
		}else{
			return res.json({success: false, msg:"password not match"});		
		}	
		});
	});	
});



//profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req,res){
	res.json({user: req.user});
});





module.exports = router;