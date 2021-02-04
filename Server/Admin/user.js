
route.get('/user', async(req, res)=>{
    await db.find({}, (err, user)=>{
        if(err){
            res.status(404)
                .send('Sorry, we cannot find that');;
        }

        return res.status(200).json({ data: user})
    })
})