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





// // TODO: define all possibility defect
// function userEmailCheck(email){

// 	const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// 	return emailRegexp.test(email); 

// }


// function userNIMCheck(nim){
	
// 	if(nim.toString().length == 10){
// 		return true;
// 	}else{
// 		return false;
// 	}

// }


// function userPasswordCheck(password){
// 	if(password === null){
// 		return false;
// 	}else{
// 		return true;
// 	}
// }

// function userAccountCheck(){

// }

// async function userCreateAccount(name, email, nim, password){

// 	const status = {
// 		email: await userEmailCheck(email),
// 		nim: await userNIMCheck(nim),
// 		password: await userPasswordCheck(password),
// 	}

// 	if(status.email && status.nim && status.password === true){

// 	}
// }

module.exports = {
    userAccountCheck, 
    userCheckAndValidate, 
    userValidatePassword,

}