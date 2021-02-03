const express = require('express');
const route = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Load user model
const db = require('../model/user.js');


route.get('/user', async(req, res)=>{
    await db.find({}, (err, user)=>{
        if(err){
            res.status(404)
                .send('Sorry, we cannot find that');;
        }

        return res.status(200).json({ data: user})
    })
})

//TODO: add middleware for auth
// IS: user input nim & password
// FS: user login success
route.post('/login', (req, res) =>{

    const { nim, password } = req.body;

    db.findOne({nim: nim}).then((err, user)=>{
        if (err) return err;

        if(!user){
            return res.status(400).json({
				status: 'error',
				error: 'email is not registered or cannot be empty',
			}); 
        }

        if(user){
            const data = {
				userId : user.id, 
				roles : user.roles, 
				name : user.name,
			};
			
			bcrypt.compare(password, user.password, (err, isMatch) =>{
				if (isMatch) {
					res.status(200).json({
						status: 'Success',
						data: data,
					})
					console.log(data);
					
				} else {
					return res.status(400).json({
						status: 'error',
						error: 'Password incorrect',
					});
				}
			})
        }
    })
})

module.exports = route;

