const express = require('express');
const route = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Load user model
const db = require('../model/user.js');


route.post('/register', async(req, res)=> {
    const { name, email, nim, password} = req.body;
	

    await db.findOne({email: email})
      .then((user)=>{
        if (user) {
			return res.status(406).json({
				status: 'error',
				error: 'Email already exists',
			  });
		} else {
			const newUser = new db({
				name,
				email,
				nim,
				password,
			});

			bcrypt.genSalt(10, (err, salt) => {
				if (err) return err;
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) return err;
					newUser.password = hash;
					newUser.save()	
					console.log('Success')
					res.status(200).json({
						message: 'Account is registered'
					})
				});
			});
		}
    })
})



module.exports = route;

