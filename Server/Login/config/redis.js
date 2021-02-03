// //require('dotenv').config({path: 'D:/PROJECT/E-vote/server/login'})


// const redis = require('redis');
// const REDIS_PORT = process.env.REDIS_PORT || 6379;
// const client = redis.createClient(REDIS_PORT)


// function setResponse(username, repos){
//     return `<h2> ${username} has ${repos} Github Repos </h2>`;
// }

// // cache middleware
// function cache(req, res, next){
//     const {username} = req.params;

//     client.get(username, (err, data)=>{
//         if(err) return err;

//         if (data !== null){
//             res.send(setResponse(username, data));
//         }else{
//             next();
//         }
//     })
// }


// async function getRepos(req, res, next) {
//     try{
//         console.log('Fecthing Data...');
//         const {username} = req.params;

//         const response = await fecth(`https://api.github.com/users/${username}`);
//         const data = await response.json()

        
//         const repos = data.public_repos;

//         //set data to redis
//         client.setex(username, 3600, repos);
        
//         res.send(setResponse(username, repos));

//     }catch (err){
//         console.error(err);
//         res.status(500);
//     }
// }

// module.exports = {setResponse, cache, getRepos}