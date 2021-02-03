const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: { 
        type: String,
        require: true
    },
    nim: {
        type: Number,
        require: true,

    },
    email: {
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    date:{ 
      type: Date, 
      default: Date.now 
    },
    roles: { 
      type: Number, 
      default: 0,
    },
    vote: {
        type: Boolean,
        default: false,
    }
});



const User = mongoose.model('Person', userSchema);


module.exports = User;