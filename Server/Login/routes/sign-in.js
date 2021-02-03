const express = require('express');
const route = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Load user model
const db = require('../model/user.js');


async function userValidatePassword(user, password, res){
	try {

		const isMatch = await bcrypt.compare(password, user.password);
		console.log(isMatch)

		switch (isMatch) {
			case true:
				return res.status(200).json({
					status: 'Success',
					data: user,
				})
		
			default:
				return res.status(400).json({
					status: 'error',
					error: 'Password incorrect',
				});
		}



		// bcrypt.compare(password, user.password, (isMatch) =>{
		// 	if (isMatch) {
		// 		return res.status(200).json({
		// 			status: 'Success',
		// 			data: data,
		// 		})
		// 	} else {
		// 		
		// 	}
		// })
	} catch (error) {
		console.error(error)
	}
	
}


// TODO check kenapa kgk bisa dihandle ama case su
function userAccountCheck(user, password, res){
	try {
		if(!user){
			return res.status(400).json({
					status: 'error',
					error: 'NIM is not registered or cannot be empty',
			});
		}
		if(user){
			userValidatePassword(user, password, res);
		}
		// switch (user !== null) {
		// 	case false:
		// 		userValidatePassword(user, password, res);
		// 	default:
		// 		return res.status(400).json({
		// 			status: 'error',
		// 			error: 'NIM is not registered or cannot be empty',
		// 		}); 
		// }
	} catch (error) {
		console.error(error)
	}
}


function userCheckAndValidate(email, password, res){
	try {
		db.findOne({email:email}).then((user)=>{
			userAccountCheck(user, password, res);
		})
	} catch (error) {
		console.error(error);
	}
}


//POST
route.post('/login', async (req, res) => {
	try {
		const {email, password} = req.body;
		await userCheckAndValidate(email, password, res);
	} catch (err) {
		console.error(err)
	}
})



module.exports = route;

