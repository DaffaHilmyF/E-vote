require('dotenv').config({path:'D:/PROJECT/E-vote/server/login/.env'})

module.exports = {
    mongoURI: `mongodb+srv://user:${process.env.mongoURI}@e-vote.26py3.mongodb.net/user?retryWrites=true&w=majority`
}