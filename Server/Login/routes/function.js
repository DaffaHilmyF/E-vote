
// Load library
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Load user model
const db = require('../model/user.js');


// check nim input is null or not
function userNIMInputCheck(nim){
    if(nim == null){

        return false;
    }
    
	if(nim.toString().length == 10){
		return true;
	}else{
		return false;
	}
}

// check password input null or not
function userPasswordInputCheck(password){
	if(password == null){
		return false;
	}else{
		return true;
	}
}

// return true or false
async function userInputCheck(nim, password){
    const isNIMTrue = await userNIMInputCheck(nim);
    const isPassTrue = await userPasswordInputCheck(password);
    return isPassTrue === isNIMTrue
}



// TODO: make it more simple & what json the FE needs to return
// IS: comparing the user password with the hased password in the database
// FS: Validated or Not
function userValidatePassword(user, password, res){
	try {

		const isMatch = bcrypt.compareSync(password, user.password);
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
	} catch (error) {
		console.error(error)
	}
	
}


// TODO: make it more simple
// IS: Check if the given input exists in the database.
// FS: if Exist execute userValidatePassword function
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
	} catch (error) {
		console.error(error)
	}
}


// TODO: make it more simple
// IS: Check if the given input exists in the database.
// FS: if Exist execute userAccountCheck function
async function userCheckAndValidate(nim, password, res){
	try {
        const isTrue = await userInputCheck(nim, password)
    
        if(isTrue== true){
            db.findOne({nim:nim}).then((user)=>{
                userAccountCheck(user, password, res);
            })
        }else{
            console.log('ini error')
            return res.status(400).json({message: "bad request"})
        }
		
	} catch (error) {
		console.error(error);
	}
}





module.exports = {
    userAccountCheck, 
    userCheckAndValidate, 
    userValidatePassword,

}