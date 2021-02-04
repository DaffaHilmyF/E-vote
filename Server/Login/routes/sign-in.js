// Load Library
const express = require('express');
const route = express();

// Load user model
const db = require('../model/user.js');

// Load function
const libs = require('./function.js')


//POST
//
route.post('/login', async (req, res) => {
	try {
		const {email, password} = req.body;
		await libs.userCheckAndValidate(email, password, res);

	} catch (err) {
		console.error(err)
	}
})



module.exports = route;

